import { signal } from '@angular/core';
import { minLength, required, schema } from '@angular/forms/signals';

import { CreateTrainerDTO } from '../../../services/api/trainers/trainerDTO';

export const addTrainerModel = signal<CreateTrainerDTO>({
  name: '',
  avatarUrl: '',
  age: 0,
  description: '',
  level: 'beginner',
  favoritePokemon: 0,
  hometown: '',
});

export const addTrainerSchema = schema<CreateTrainerDTO>(p => {
  required(p.name, { message: 'Le nom est requis' });
  minLength(p.name, 2, { message: 'Le nom doit contenir au moins 2 caractères' });
});
