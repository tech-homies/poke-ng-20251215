import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

import { CreateTrainerDTO } from '../../../services/api/trainers/trainerDTO';

@Component({
  selector: 'app-add-trainer-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatLabel, MatDialogActions, MatFormField, MatInput, MatButton, Field],
  templateUrl: './add-trainer-dialog.html',
  styleUrl: './add-trainer-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTrainerDialog {
  addTrainerModel = signal<Required<CreateTrainerDTO>>({
    name: '',
    avatarUrl: '',
    age: 0,
    description: '',
    level: 'beginner',
    favoritePokemon: 0,
    hometown: '',
  });

  protected addTrainerForm = form(this.addTrainerModel);
}
