import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { TrainersApi } from '../../services/api/trainers/trainers.api';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-select-user-page',
  imports: [UserCard, MatButton, AsyncPipe],
  templateUrl: './select-user-page.html',
  styleUrl: './select-user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectUserPage {
  readonly #trainersApi = inject(TrainersApi);

  readonly users$ = this.#trainersApi.getAll();
}
