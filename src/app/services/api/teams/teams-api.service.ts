import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { TeamDTO } from './team.dto';

@Injectable({
  providedIn: 'root',
})
export class TeamsApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl + '/trainers';

  public get(trainerId: number): Observable<TeamDTO> {
    return this.http.get<TeamDTO>(`${this.baseUrl}/${trainerId}/team`);
  }

  public updateTeam(trainerId: number, team: number[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${trainerId}/team`, {
      trainerId,
      pokemons: team,
    });
  }
}
