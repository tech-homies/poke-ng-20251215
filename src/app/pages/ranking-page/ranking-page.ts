import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { TrainersApi } from '../../services/api/trainers/trainers.api';

@Component({
  selector: 'app-ranking-page',
  imports: [],
  templateUrl: './ranking-page.html',
  styleUrl: './ranking-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RankingPage {
  private readonly trainersApi = inject(TrainersApi);
  public readonly trainers = toSignal(this.trainersApi.getAllWithRank());
}
