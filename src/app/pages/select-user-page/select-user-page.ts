import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';

import { TrainerDTO } from '../../services/api/trainers/trainerDTO';
import { TrainersApi } from '../../services/api/trainers/trainers.api';
import { AddTrainerDialog } from './add-trainer-dialog/add-trainer-dialog';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-select-user-page',
  imports: [UserCard, MatButton],
  templateUrl: './select-user-page.html',
  styleUrl: './select-user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectUserPage {
  private readonly trainersApi = inject(TrainersApi);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly _users = toSignal(this.trainersApi.getAll(), { initialValue: [] });
  protected readonly users = linkedSignal<TrainerDTO[]>(() => this._users());

  openAddTrainerDialog() {
    this.dialog
      .open(AddTrainerDialog)
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(newUser => {
        this.users.update(users => users.concat(newUser));
        this.snackBar.open(`🎉 Trainer ${newUser.name} added successfully!`);
      });
  }
}
