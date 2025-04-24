import {Injectable} from '@angular/core';
import {RandomFact} from './random-fact';

@Injectable({
  providedIn: 'root'
})
export class FavoriteFactsService {

  private favoriteFacts: RandomFact[];

  constructor() {
    this.favoriteFacts = [];
  }

  getFacts(): RandomFact[] {
    return this.favoriteFacts;
  }

  saveFact(currentFact: RandomFact): void {
    const isDuplicate = this.favoriteFacts.some(fact => fact.id === currentFact.id);
    !isDuplicate && this.favoriteFacts.push(currentFact);
  }

  removeFact(currentFact: RandomFact): RandomFact[] {
    this.favoriteFacts = this.favoriteFacts.filter(fact => fact.id !== currentFact.id);
    return this.favoriteFacts;
  }
}
