import {Component, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RandomFactService} from './services/random-fact.service';
import {RandomFact} from './services/random-fact';
import {FavoriteFactsListComponent} from './components/favorite-facts-list/favorite-facts-list.component';
import {FavoriteFactsService} from './services/favorite-facts.service';
import {take} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [MatIconModule, MatButtonModule, FavoriteFactsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  currentRandomFact = signal<RandomFact | undefined>(undefined);
  private randomFactService = inject(RandomFactService);
  private favoriteFactsService = inject(FavoriteFactsService);

  constructor() {
    this.fetchRandomFact();
  }

  fetchRandomFact() {
    this.randomFactService.getRandomFact().pipe(take(1)).subscribe(randomFact => {
      this.currentRandomFact.set(randomFact)
    })
  }

  saveAsFavorite(fact: RandomFact | undefined) {
    fact && this.favoriteFactsService.saveFact(fact)
  }
}
