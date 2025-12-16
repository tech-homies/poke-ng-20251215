import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { PokemonDTO } from './pokemonDTO';

@Injectable({
  providedIn: 'root',
})
export class PokemonsApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl + '/pokemons';

  public get(id: number): Observable<PokemonDTO> {
    return this.http.get<PokemonDTO>(`${this.baseUrl}/${id}`);
  }
}
