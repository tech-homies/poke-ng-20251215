import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { CreateTrainerDTO, TrainerDTO } from './trainerDTO';

@Injectable({
  providedIn: 'root',
})
export class TrainersApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl + '/trainers';

  get(id: number): Observable<TrainerDTO> {
    return this.http.get<TrainerDTO>(`${this.baseUrl}/${id}`);
  }
  getAll(): Observable<TrainerDTO[]> {
    return this.http.get<TrainerDTO[]>(this.baseUrl);
  }
  add(trainer: CreateTrainerDTO): Observable<TrainerDTO> {
    return this.http.post<TrainerDTO>(this.baseUrl, trainer);
  }
}
