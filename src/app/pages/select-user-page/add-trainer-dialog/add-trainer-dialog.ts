import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-add-trainer-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatLabel, MatDialogActions, MatFormField, MatInput, MatButton],
  templateUrl: './add-trainer-dialog.html',
  styleUrl: './add-trainer-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTrainerDialog {}
