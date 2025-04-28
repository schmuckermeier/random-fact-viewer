import { TestBed } from '@angular/core/testing';
import { RandomFactService } from './random-fact.service';
import {HttpClient} from '@angular/common/http';
import {mockRandomFacts} from '../testing/mockRandomFacts';

describe('RandomFactService', () => {
  let service: RandomFactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: {get: () => mockRandomFacts}}
      ],
    });
    service = TestBed.inject(RandomFactService);
  });

  it('should call getBook method and return results', () => {
    expect(service.getRandomFact()).toEqual(mockRandomFacts);
  });
});
