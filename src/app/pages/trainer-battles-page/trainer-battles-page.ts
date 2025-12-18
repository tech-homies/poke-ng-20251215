import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, numberAttribute, OnInit, signal } from '@angular/core';

import { BattleDTO } from '../../services/api/battles/battleDTO';
import { BattlesApi } from '../../services/api/battles/battles-api.service';

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
  public readonly battles = signal<BattleDTO[]>([]);

  ngOnInit(): void {
    this.battlesApi.getByTrainer(this.id()).subscribe(battles => {
      this.battles.set(battles);
    });
  }
}
