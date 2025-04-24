import { TestBed } from '@angular/core/testing';

import { FavoriteFactsService } from './favorite-facts.service';

describe('FavoriteFactsService', () => {
  let service: FavoriteFactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteFactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
