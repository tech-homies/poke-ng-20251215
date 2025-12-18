import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { UserStore } from '../../services/stores/user.store';

export const authGuard: CanActivateChildFn = () => {
  const user = inject(UserStore).user();
  return user ? true : inject(Router).createUrlTree(['/']);
};
