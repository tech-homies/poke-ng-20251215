import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { TrainersApi } from '../../services/api/trainers/trainers.api';

@Component({
  selector: 'app-trainers-page',
  imports: [RouterLink, MatButton],
  templateUrl: './trainers-page.html',
  styleUrl: './trainers-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrainersPage {
  private readonly trainersApi = inject(TrainersApi);
  public readonly trainers = toSignal(this.trainersApi.getAll());
}
