import { signal } from '@angular/core';
import { debounce, minLength, required, schema, validate, validateHttp } from '@angular/forms/signals';

import { environment } from '../../../../environments/environment';
import { CreateTrainerDTO } from '../../../services/api/trainers/trainerDTO';

export const addTrainerModel = signal<Required<CreateTrainerDTO>>({
  name: '',
  avatarUrl: '',
  age: 0,
  description: '',
  level: 'beginner',
  favoritePokemon: 0,
  hometown: '',
});

export const addTrainerSchema = schema<Required<CreateTrainerDTO>>(schemaPath => {
  required(schemaPath.name, { message: 'Le nom est requis' });
  minLength(schemaPath.name, 2, { message: 'Le nom doit contenir au moins 2 caractères' });

  // L'age doit être au minimum le nombre de caractères du nom.
  validate(schemaPath.age, ctx => {
    const age = ctx.value();
    const nameLength = ctx.valueOf(schemaPath.name).length;
    if (age < nameLength) {
      return {
        kind: 'ageTooLow',
        message: `L'âge doit être au moins égal à la longueur du nom (${nameLength})`,
      };
    }
    return null;
  });

  // Il faut valider que le numéro de pokémon favori existe.
  debounce(schemaPath.favoritePokemon, 400);
  validateHttp(schemaPath.favoritePokemon, {
    request: ({ value }) => `${environment.apiBaseUrl}/pokemons/${value()}`,
    onSuccess: () => null,
    onError: () => ({
      kind: 'pokemonNotFound',
      message: 'Ce Pokémon n’existe pas dans le Pokédex',
    }),
  });
});
