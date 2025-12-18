import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserStore } from '../../services/stores/user.store';

export const authGuard: CanActivateFn = () => {
  const user = inject(UserStore).user();
  return user ? true : inject(Router).createUrlTree(['/']);
};
