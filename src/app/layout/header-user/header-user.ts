import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

import { TrainerDTO } from '../../services/api/trainers/trainerDTO';
import { UserStore } from '../../services/stores/user.store';

@Component({
  selector: 'app-header-user',
  imports: [MatMenu, MatMenuItem, MatButton, MatMenuTrigger, NgOptimizedImage],
  templateUrl: './header-user.html',
  styleUrl: './header-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUser {
  public readonly user = input.required<TrainerDTO>();
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  protected logout(): void {
    this.userStore.logout();
    this.router.navigate(['']);
  }
}
