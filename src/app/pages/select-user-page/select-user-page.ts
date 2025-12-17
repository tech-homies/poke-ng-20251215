import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { TrainersApi } from '../../services/api/trainers/trainers.api';
import { AddTrainerDialog } from './add-trainer-dialog/add-trainer-dialog';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-select-user-page',
  imports: [UserCard, MatButton, AsyncPipe],
  templateUrl: './select-user-page.html',
  styleUrl: './select-user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectUserPage {
  private readonly trainersApi = inject(TrainersApi);
  private readonly dialog = inject(MatDialog);

  readonly users$ = this.trainersApi.getAll();

  openAddTrainerDialog() {
    this.dialog.open(AddTrainerDialog);
  }
}
