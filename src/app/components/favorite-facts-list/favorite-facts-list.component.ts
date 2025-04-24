import {Component, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RandomFact} from '../../services/random-fact';
import {FavoriteFactsService} from '../../services/favorite-facts.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-favorite-facts-list',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './favorite-facts-list.component.html',
  styleUrl: './favorite-facts-list.component.css'
})
export class FavoriteFactsListComponent {
  private favoriteFactsService = inject(FavoriteFactsService);

  favoriteFacts = signal<RandomFact[]>(this.favoriteFactsService.getFacts());

  removeFromFavorites(fact: RandomFact) {
    const updatedFacts = this.favoriteFactsService.removeFact(fact);
    this.favoriteFacts.set(updatedFacts);
  }
}
