import { signal } from '@angular/core';
import { debounce, max, min, minLength, required, schema, validate, validateHttp } from '@angular/forms/signals';

import { environment } from '../../../../environments/environment';
import { CreateTrainerDTO } from '../../../services/api/trainers/trainerDTO';

export const addTrainerModel = signal<Required<CreateTrainerDTO>>({
  name: '',
  avatarUrl: '',
  age: NaN,
  description: '',
  level: 'beginner',
  favoritePokemon: NaN,
  hometown: '',
});

export const addTrainerSchema = schema<Required<CreateTrainerDTO>>(schemaPath => {
  required(schemaPath.name, { message: 'Le nom est requis' });
  minLength(schemaPath.name, 2, { message: 'Le nom doit contenir au moins 2 caractères' });
  required(schemaPath.level, { message: 'Le niveau est requis' });
  required(schemaPath.avatarUrl, { message: "L'URL de l'avatar est requise" });
  required(schemaPath.description, { message: 'La description est requise' });
  required(schemaPath.age, { message: "L'âge est requis" });
  min(schemaPath.age, 5, { message: "L'âge minimum est de 5 ans" });
  max(schemaPath.age, 5000, { message: "L'âge maximum est de 5000 ans" });
  required(schemaPath.hometown, { message: 'La ville natale est requise' });
  min(schemaPath.favoritePokemon, 1, { message: 'Le Pokédex ID doit être au moins 1' });

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
    request: ({ value }) => (value() ? `${environment.apiBaseUrl}/pokemons/${value()}` : undefined),
    onSuccess: () => null,
    onError: () => ({
      kind: 'pokemonNotFound',
      message: 'Ce Pokémon n’existe pas dans le Pokédex',
    }),
  });
});
