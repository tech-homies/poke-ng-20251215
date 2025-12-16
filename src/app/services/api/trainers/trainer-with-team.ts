import { PokemonDTO } from '../pokemons/pokemonDTO';
import { TrainerDTO } from './trainerDTO';

export interface TrainerWithTeam extends TrainerDTO {
  team: PokemonDTO[];
}
