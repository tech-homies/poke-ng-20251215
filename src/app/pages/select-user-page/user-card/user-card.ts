import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TrainerDTO } from '../../../services/api/trainers/trainerDTO';

@Component({
  selector: 'app-user-card',
  imports: [JsonPipe],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCard {
  public readonly trainer = input.required<TrainerDTO>();
}
