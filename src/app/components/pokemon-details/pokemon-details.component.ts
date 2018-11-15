import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Pokemon } from 'src/app/services/models/pokemon.model';
import { MyPokemonService } from 'src/app/services/pokemon/my-pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent {
  @Input() pokemon: Pokemon;

  constructor(
    private myPokemonService: MyPokemonService,
  ) { }

  public get myPokemon$(): Observable<Pokemon> {
    return this.myPokemonService.myPokemon$;
  }

  public onClearPokemon() {
    this.myPokemonService.clearPokemon();
  }

  public onSavePokemon() {
    this.myPokemonService.savePokemon(this.pokemon);
  }
}
