import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap } from 'rxjs/operators';
import { PokemonFetchingService } from './services/pokemon/pokemon-fetching.service';
import { Pokemon } from './services/models/pokemon.model';
import { MyPokemonService } from './services/pokemon/my-pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private inputDebouncer$: Subject<string> = new Subject();
  public pokemon$: Observable<Pokemon>;

  constructor(
    private pokemonFetchingService: PokemonFetchingService,
    private myPokemonService: MyPokemonService,
  ) { }

  public ngOnInit(): void {
    this.setupSearch();

    this.myPokemonService.init();
  }

  public get myPokemon$(): Observable<Pokemon> {
    return this.myPokemonService.myPokemon$;
  }

  public onInput(keyUpEvent: KeyboardEvent) {
    const target: HTMLInputElement = keyUpEvent.target as HTMLInputElement;
    this.inputDebouncer$.next(target.value);
  }

  private setupSearch() {
    this.pokemon$ = this.inputDebouncer$.pipe(
      distinctUntilChanged(),
      debounceTime(250),
      switchMap((inputValue: string) => {
        return this.pokemonFetchingService.find(inputValue);
      }),
    );
  }
}
