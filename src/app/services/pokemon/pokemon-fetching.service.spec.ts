import { TestBed } from '@angular/core/testing';

import { PokemonFetchingService } from './pokemon-fetching.service';

describe('PokemonFetchingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokemonFetchingService = TestBed.get(PokemonFetchingService);
    expect(service).toBeTruthy();
  });
});
