import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RandomFact} from '../../services/random-fact';
import {FavoriteFactsService} from '../../services/favorite-facts.service';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-favorite-facts-list',
  imports: [MatIconModule, MatButtonModule, MatTableModule],
  templateUrl: './favorite-facts-list.component.html',
  styleUrl: './favorite-facts-list.component.css'
})
export class FavoriteFactsListComponent {
  displayedColumns: string[] = ['name', 'source', 'delete'];

  private favoriteFactsService = inject(FavoriteFactsService);

  favoriteFacts$ = this.favoriteFactsService.getFacts();

  removeFromFavorites(fact: RandomFact) {
    this.favoriteFactsService.removeFact(fact);
  }
}
