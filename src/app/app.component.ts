import {Component, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RandomFactService} from './services/random-fact.service';
import {FavoriteFactsService} from './services/favorite-facts.service';
import {RandomFact} from './services/random-fact';

@Component({
  selector: 'app-root',
  imports: [MatIconModule, MatButtonModule, MatIconModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private randomFactService = inject(RandomFactService);
  private favoriteFactsService = inject(FavoriteFactsService);

  currentRandomFact = signal<RandomFact| undefined>(undefined)
  favoriteFacts = signal<RandomFact[]>(this.favoriteFactsService.getFacts());

  constructor() {
    this.randomFactService.getRandomFact().subscribe(randomFact => {this.currentRandomFact.set(randomFact)})
  }

  fetchRandomFact() {
    this.randomFactService.getRandomFact().subscribe(randomFact => {this.currentRandomFact.set(randomFact)})
  }

  saveAsFavorite() {
    const fact = this.currentRandomFact();
    fact && this.favoriteFactsService.saveFact(fact)
  }

  removeFromFavorites(fact: RandomFact) {
    const updatedFacts = this.favoriteFactsService.removeFact(fact);
    this.favoriteFacts.set(updatedFacts);
  }
}
