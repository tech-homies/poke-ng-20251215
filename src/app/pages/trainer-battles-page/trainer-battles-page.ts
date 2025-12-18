import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, numberAttribute, OnInit, signal } from '@angular/core';

import { BattleDTO } from '../../services/api/battles/battleDTO';
import { BattlesApi } from '../../services/api/battles/battles-api.service';
import { TrainerDTO } from '../../services/api/trainers/trainerDTO';
import { TrainersApi } from '../../services/api/trainers/trainers.api';

@Component({
  selector: 'app-trainer-battles-page',
  imports: [JsonPipe],
  templateUrl: './trainer-battles-page.html',
  styleUrl: './trainer-battles-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrainerBattlesPage implements OnInit {
  public readonly id = input.required({ transform: numberAttribute });
  private readonly battlesApi = inject(BattlesApi);
  private readonly trainerApi = inject(TrainersApi);
  public readonly battles = signal<BattleDTO[]>([]);
  public readonly trainer = signal<TrainerDTO | null>(null);

  ngOnInit(): void {
    this.trainerApi.get(this.id()).subscribe(trainer => {
      this.trainer.set(trainer);
    });
    this.battlesApi.getByTrainer(this.id()).subscribe(battles => {
      this.battles.set(battles);
    });
  }
}
