import {Component} from '@angular/core';
import {FavoriteFactsListComponent} from './components/favorite-facts-list/favorite-facts-list.component';
import {FactViewerComponent} from './components/fact-viewer/fact-viewer.component';

@Component({
  selector: 'app-root',
  imports: [FavoriteFactsListComponent, FactViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
