import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

import { BattlesApi } from '../../services/api/battles/battles-api.service';
import { TrainerDTO } from '../../services/api/trainers/trainerDTO';
import { TrainersApi } from '../../services/api/trainers/trainers.api';
import { UserStore } from '../../services/stores/user.store';

@Component({
  selector: 'app-trainers-page',
  imports: [RouterLink, MatButton],
  templateUrl: './trainers-page.html',
  styleUrl: './trainers-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrainersPage {
  private readonly trainersApi = inject(TrainersApi);
  private readonly battlesApi = inject(BattlesApi);
  private readonly userStore = inject(UserStore);
  private readonly sn = inject(MatSnackBar);
  public readonly trainers = toSignal(this.trainersApi.getAll());

  fight(trainer: TrainerDTO) {
    const currentUser = this.userStore.user()!;
    this.battlesApi.startBattleWithTrainer(currentUser.id, trainer.id).subscribe(result => {
      const winner = this.trainers()!.find(t => t.id === result.winnerId)!;
      this.sn.open(`${winner.name} a gagné le combat !`, 'Fermer', {
        duration: 5000,
      });
    });
  }
}
