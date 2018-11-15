export interface IPokemon {
  id: string;
  name: string;
}

export class Pokemon implements IPokemon {
  constructor(private pokemonData: IPokemon) { }

  public get id(): string {
    return this.pokemonData.id;
  }

  public get name(): string {
    return this.pokemonData.name;
  }
}
