import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Field, form, submit } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatOption, MatSelect } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';

import { trainerLevels } from '../../../services/api/trainers/trainer-levels';
import { TrainersApi } from '../../../services/api/trainers/trainers.api';
import { addTrainerModel, addTrainerSchema } from './add-trainer-dialog.form';

@Component({
  selector: 'app-add-trainer-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatLabel,
    MatDialogActions,
    MatFormField,
    MatInput,
    MatButton,
    Field,
    MatSelect,
    MatOption,
    MatError,
    MatProgressBar,
    MatDialogClose,
  ],
  templateUrl: './add-trainer-dialog.html',
  styleUrl: './add-trainer-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTrainerDialog {
  protected readonly trainerLevels = trainerLevels;
  private readonly trainersApi = inject(TrainersApi);
  private readonly dialogRef = inject(MatDialogRef<AddTrainerDialog>);

  protected form = form(addTrainerModel, addTrainerSchema);

  protected async submitForm(event: SubmitEvent) {
    event.preventDefault();

    await submit(this.form, async form => {
      const newTrainer = form().value();
      const createdTrainer = await firstValueFrom(this.trainersApi.add(newTrainer));
      this.dialogRef.close(createdTrainer);
    });
  }
}
