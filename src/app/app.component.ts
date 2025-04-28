import {Component, signal} from '@angular/core';
import {FavoriteFactsListComponent} from './components/favorite-facts-list/favorite-facts-list.component';
import {FactViewerComponent} from './components/fact-viewer/fact-viewer.component';
import {SearchInputComponent} from './components/search-input/search-input.component';
import {RandomFact} from './services/random-fact';

@Component({
  selector: 'app-root',
  imports: [FavoriteFactsListComponent, FactViewerComponent, SearchInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedFact = signal<RandomFact| undefined>(undefined);

  onFactSelected(fact: RandomFact) {
    this.selectedFact.set(fact);
  }
}
