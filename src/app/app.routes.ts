import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/select-user-page/select-user-page') },
  {
    path: 'app',
    loadComponent: () => import('./layout/layout'),
    children: [
      { path: 'pokemons', loadComponent: () => import('./pages/pokemons-page/pokemons-page') },
      // { path: 'ranking' },
      // { path: '...' },
    ],
  },
];
