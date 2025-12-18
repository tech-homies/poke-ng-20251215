import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/select-user-page/select-user-page') },
  {
    path: 'app',
    loadComponent: () => import('./layout/layout'),
    children: [
      { path: 'pokemons', loadComponent: () => import('./pages/pokemons-page/pokemons-page') },
      { path: 'ranking', loadComponent: () => import('./pages/ranking-page/ranking-page') },
      { path: 'trainers', loadComponent: () => import('./pages/trainers-page/trainers-page') },
      {
        path: 'trainers/:id/battles',
        loadComponent: () => import('./pages/trainer-battles-page/trainer-battles-page'),
      },
    ],
  },
];
