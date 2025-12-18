import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';

import { PokemonDTO } from '../../services/api/pokemons/pokemonDTO';
import { PokemonsApi } from '../../services/api/pokemons/pokemons-api.service';
import { TeamDTO } from '../../services/api/teams/team.dto';
import { TeamsApi } from '../../services/api/teams/teams-api.service';
import { UserStore } from '../../services/stores/user.store';

@Component({
  selector: 'app-pokemons-page',
  imports: [MatButton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {
  private readonly teamsApi = inject(TeamsApi);
  private readonly pokemonsApi = inject(PokemonsApi);
  private readonly userStore = inject(UserStore);
  private readonly user = this.userStore.user;

  protected readonly pokemons = toSignal(this.pokemonsApi.getAll(), { initialValue: [] });
  protected readonly userTeams = signal<TeamDTO | undefined>(undefined);

  protected readonly teamPokemons = computed(() => {
    const allPokemons = this.pokemons();
    const team = this.userTeams();
    if (!team) return [];

    return team.pokemons
      .map(id => allPokemons.find(p => p.pokedex_id === id))
      .filter((p): p is PokemonDTO => p !== undefined);
  });

  ngOnInit() {
    this.loadTeam();
  }

  private loadTeam() {
    this.teamsApi.get(this.user()!.id).subscribe(team => {
      this.userTeams.set(team);
    });
  }

  addToTeam(pokemon: PokemonDTO) {
    // TODO: vérifier que l'équipe ne dépasse pas 3 pokémons
    this.teamsApi.updateTeam(this.user()!.id, [...this.userTeams()!.pokemons, pokemon.pokedex_id]).subscribe(() => {
      this.loadTeam();
    });
  }

  removeFromTeam(pokemon: PokemonDTO) {
    const currentTeam = this.userTeams()!.pokemons;
    const updatedTeam = currentTeam.filter(id => id !== pokemon.pokedex_id);
    this.teamsApi.updateTeam(this.user()!.id, updatedTeam).subscribe(() => {
      this.loadTeam();
    });
  }
}
