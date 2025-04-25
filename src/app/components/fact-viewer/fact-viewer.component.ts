import {Component, inject, signal} from '@angular/core';
import {RandomFact} from '../../services/random-fact';
import {RandomFactService} from '../../services/random-fact.service';
import {FavoriteFactsService} from '../../services/favorite-facts.service';
import {take} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-fact-viewer',
  imports: [MatCardModule,MatIconModule, MatButtonModule],
  templateUrl: './fact-viewer.component.html',
  styleUrl: './fact-viewer.component.css'
})
export class FactViewerComponent {
  private randomFactService = inject(RandomFactService);
  private favoriteFactsService = inject(FavoriteFactsService);

  currentRandomFact = signal<RandomFact | undefined>(undefined);

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
