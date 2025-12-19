import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { BattleDTO } from './battleDTO';

@Injectable({
  providedIn: 'root',
})
export class BattlesApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl + '/battles';

  getAll(): Observable<BattleDTO[]> {
    return this.http.get<BattleDTO[]>(`${this.baseUrl}`);
  }

  getByTrainer(trainerId: number): Observable<BattleDTO[]> {
    return this.http.get<BattleDTO[]>(`${this.baseUrl}`, { params: { trainerId } });
  }

  startBattleWithTrainer(trainer1Id: number, trainer2Id: number): Observable<BattleDTO> {
    return this.http.post<BattleDTO>(`${this.baseUrl}`, { trainer1Id, trainer2Id });
  }
}
