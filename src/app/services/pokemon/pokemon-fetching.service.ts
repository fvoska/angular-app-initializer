import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon, IPokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonFetchingService {
  constructor(private http: HttpClient) { }

  public find(nameOrId: string): Observable<Pokemon> {
    if (!nameOrId) {
      return of(null);
    }

    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${nameOrId}/`).pipe(
      catchError((e) => {
        return of(null);
      }),
      map((pokemonData: IPokemon) => {
        return pokemonData ? new Pokemon(pokemonData) : null;
      }),
    );
  }
}
