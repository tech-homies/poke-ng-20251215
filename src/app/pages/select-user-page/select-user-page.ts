import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { TrainerWithTeam } from '../../services/api/trainers/trainer-with-team';
import { TrainersApi } from '../../services/api/trainers/trainers.api';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-select-user-page',
  imports: [UserCard],
  templateUrl: './select-user-page.html',
  styleUrl: './select-user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectUserPage implements OnInit {
  private readonly trainersApi = inject(TrainersApi);
  protected readonly trainers = signal<TrainerWithTeam[]>([]);

  ngOnInit(): void {
    this.trainersApi.getAllWithTeam().subscribe(trainers => {
      this.trainers.set(trainers);
    });
  }
}
