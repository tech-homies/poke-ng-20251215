import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatAll, forkJoin, map, mergeMap, Observable, toArray } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { BattlesApi } from '../battles/battles-api.service';
import { PokemonsApi } from '../pokemons/pokemons-api.service';
import { TeamDTO } from '../teams/team.dto';
import { TeamsApi } from '../teams/teams-api.service';
import { TrainerWithRank } from './trainer-with-rank';
import { TrainerWithTeam } from './trainer-with-team';
import { CreateTrainerDTO, TrainerDTO } from './trainerDTO';

@Injectable({
  providedIn: 'root',
})
export class TrainersApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl + '/trainers';
  private readonly teamsApi = inject(TeamsApi);
  private readonly pokemonsApi = inject(PokemonsApi);
  private readonly battlesApi = inject(BattlesApi);

  get(id: number): Observable<TrainerDTO> {
    return this.http.get<TrainerDTO>(`${this.baseUrl}/${id}`);
  }
  getAll(): Observable<TrainerDTO[]> {
    return this.http.get<TrainerDTO[]>(this.baseUrl);
  }
  add(trainer: CreateTrainerDTO): Observable<TrainerDTO> {
    return this.http.post<TrainerDTO>(this.baseUrl, trainer);
  }
  getAllWithTeam(): Observable<TrainerWithTeam[]> {
    return this.getAll().pipe(
      concatAll(),
      mergeMap(
        (trainer): Observable<TrainerWithTeam> =>
          this.teamsApi.get(trainer.id).pipe(
            map((team: TeamDTO): number[] => team.pokemons),
            concatAll(),
            mergeMap(pokemonId => this.pokemonsApi.get(pokemonId)),
            toArray(),
            map((pokemons): TrainerWithTeam => ({ ...trainer, team: pokemons }))
          )
      ),
      toArray(),
      map(trainersWithTeam => [...trainersWithTeam].sort((t1, t2) => t1.id - t2.id))
    );
  }
  getAllWithRank(): Observable<TrainerWithRank[]> {
    return forkJoin({
      trainers: this.getAll(),
      battles: this.battlesApi.getAll(),
    }).pipe(
      map(({ trainers, battles }) => {
        // Calculer les points, victoires et défaites pour chaque trainer
        // 1 win = 3 points, 1 loss = 1 point
        const statsMap = new Map<number, { points: number; wins: number; losses: number }>();

        // Initialiser tous les trainers avec 0 points, 0 victoires, 0 défaites
        trainers.forEach(trainer => statsMap.set(trainer.id, { points: 0, wins: 0, losses: 0 }));

        // Calculer les points, victoires et défaites à partir des battles
        battles.forEach(battle => {
          const winnerId = battle.winnerId;
          const loserId = battle.trainer1Id === winnerId ? battle.trainer2Id : battle.trainer1Id;

          const winnerStats = statsMap.get(winnerId)!;
          const loserStats = statsMap.get(loserId)!;

          winnerStats.points += 3;
          winnerStats.wins += 1;

          loserStats.points += 1;
          loserStats.losses += 1;
        });

        // Créer les trainers avec leurs stats et trier
        const trainersWithStats = trainers.map(trainer => {
          const stats = statsMap.get(trainer.id) || { points: 0, wins: 0, losses: 0 };
          return {
            ...trainer,
            points: stats.points,
            wins: stats.wins,
            losses: stats.losses,
          };
        });

        trainersWithStats.sort((a, b) => b.points - a.points);

        // Assigner le rang
        return trainersWithStats.map(
          (trainer, index): TrainerWithRank => ({
            ...trainer,
            rank: index + 1,
          })
        );
      })
    );
  }
}
