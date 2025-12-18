import { Injectable, signal } from '@angular/core';

import { TrainerDTO } from '../api/trainers/trainerDTO';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly _user = signal<TrainerDTO | null>(null);
  public readonly user = this._user.asReadonly();

  public login(user: TrainerDTO): void {
    this._user.set(user);
  }

  public logout(): void {
    this._user.set(null);
  }
}
