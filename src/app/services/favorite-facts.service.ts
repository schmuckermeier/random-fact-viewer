import {Injectable} from '@angular/core';
import {RandomFact} from './random-fact';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavoriteFactsService {
  private readonly favoriteFacts = new BehaviorSubject<RandomFact[]>([]);

  getFacts(): Observable<RandomFact[]> {
    return this.favoriteFacts.asObservable();
  }

  saveFact(newFact: RandomFact): void {
    let currentFacts = this.favoriteFacts.getValue();
    const isDuplicate = currentFacts.some(fact => fact.id === newFact.id);
    !isDuplicate && this.favoriteFacts.next( [...currentFacts, newFact]);
  }

  removeFact(toRemoveFact: RandomFact): void {
    let currentFacts = this.favoriteFacts.getValue();
    let updatedFacts = currentFacts.filter(fact => fact.id !== toRemoveFact.id);
    this.favoriteFacts.next(updatedFacts);
  }
}
