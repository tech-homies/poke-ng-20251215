import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { Router } from '@angular/router';

import { TrainerDTO } from '../../../services/api/trainers/trainerDTO';
import { UserStore } from '../../../services/stores/user.store';

@Component({
  selector: 'app-user-card',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    NgOptimizedImage,
  ],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCard {
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStore);

  readonly user = input.required<TrainerDTO>();

  selectTrainer(): void {
    this.userStore.login(this.user());
    this.router.navigate(['/app/pokemons']);
  }
}
