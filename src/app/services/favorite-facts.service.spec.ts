import {TestBed} from '@angular/core/testing';
import {FavoriteFactsService} from './favorite-facts.service';
import {mockRandomFact} from '../testing/mockRandomFacts';

describe('FavoriteFactsService', () => {
  let service: FavoriteFactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteFactsService);
  });

  test('should initialize with empty list', (done) => {
    service.getFacts().subscribe((facts) => {
      expect(facts).toEqual([]);
      done();
    });
  });

  test('should save new fact', (done) => {
    service.saveFact(mockRandomFact);

    service.getFacts().subscribe((facts) => {
      expect(facts).toEqual([mockRandomFact]);
      done();
    });
  });

  test('should delete fact', (done) => {
    service.saveFact(mockRandomFact);
    service.removeFact(mockRandomFact);

    service.getFacts().subscribe((facts) => {
      expect(facts).toEqual([]);
      done();
    });
  });
})
