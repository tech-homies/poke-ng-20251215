import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';

import { PokemonDTO } from '../../services/api/pokemons/pokemonDTO';
import { PokemonsApi } from '../../services/api/pokemons/pokemons-api.service';
import { TeamsApi } from '../../services/api/teams/teams-api.service';
import { UserStore } from '../../services/stores/user.store';

@Component({
  selector: 'app-pokemons-page',
  imports: [MatButton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {
  private readonly teamsApi = inject(TeamsApi);
  private readonly pokemonsApi = inject(PokemonsApi);
  private readonly userStore = inject(UserStore);
  private readonly user = this.userStore.user;

  protected readonly pokemons = toSignal(this.pokemonsApi.getAll(), { initialValue: [] });
  protected readonly userTeams = toSignal(this.teamsApi.get(this.user()!.id));

  addToTeam(pokemon: PokemonDTO) {
    // TODO: vérifier que l'équipe ne dépasse pas 3 pokémons
    this.teamsApi.updateTeam(this.user()!.id, [...this.userTeams()!.pokemons, pokemon.pokedex_id]).subscribe();
  }
}
