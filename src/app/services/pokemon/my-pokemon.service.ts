import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { BehaviorSubject } from 'rxjs';
import { PokemonFetchingService } from './pokemon-fetching.service';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyPokemonService {
  public myPokemon$: BehaviorSubject<Pokemon> = new BehaviorSubject(null);
  private readonly storageKey = 'my-pokemon';

  constructor(
    private pokemonFetchingService: PokemonFetchingService,
  ) { }

  public init(): void {
    const savedPokemonId = localStorage.getItem(this.storageKey);

    this.pokemonFetchingService.find(savedPokemonId).pipe(delay(2000)).subscribe((pokemon) => {
      this.myPokemon$.next(pokemon);
    });
  }

  public savePokemon(pokemon: Pokemon) {
    this.myPokemon$.next(pokemon);
    localStorage.setItem(this.storageKey, pokemon.id);
  }

  public clearPokemon() {
    this.myPokemon$.next(null);
    localStorage.removeItem(this.storageKey);
  }
}
