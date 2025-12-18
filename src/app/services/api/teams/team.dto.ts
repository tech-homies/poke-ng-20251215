import { PokemonDTO } from '../pokemons/pokemonDTO';

export interface TeamDTO {
  trainer_id: number;
  pokemons: PokemonDTO['pokedex_id'][];
}
