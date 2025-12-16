import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { concatAll, map, mergeMap, Observable, toArray } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { PokemonsApi } from '../pokemons/pokemons-api.service';
import { TeamDTO } from '../teams/team.dto';
import { TeamsApi } from '../teams/teams-api.service';
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

  // getAllWithTeam2(): Observable<TrainerWithTeam[]> {
  //   forkJoin({
  //     trainers: this.getAll(),
  //     pokemons: this.pokemonsApi.getAll(),
  //   }).pipe(
  //     map(({ trainers, pokemons }) => trainers),
  //     concatAll(),
  //     mergeMap(
  //       (trainer): Observable<TeamDTO> =>
  //         this.teamsApi
  //           .get(trainer.id)
  //           .pipe
  //           ///
  //           ()
  //     )
  //   );
  // }
}
