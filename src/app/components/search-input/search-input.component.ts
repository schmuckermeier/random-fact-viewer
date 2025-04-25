import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AsyncPipe} from '@angular/common';
import {combineLatest, map, Observable, startWith} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {FavoriteFactsService} from '../../services/favorite-facts.service';
import {RandomFact} from '../../services/random-fact';

@Component({
  selector: 'app-search-input',
  imports: [MatFormFieldModule, MatAutocompleteModule, MatInputModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  myControl = new FormControl('');
  filteredOptions: Observable<RandomFact[]>;

  private favoriteFactsService = inject(FavoriteFactsService);

  @Output() selectedFact = new EventEmitter<RandomFact>();

  constructor() {
    const allFavoriteFacts = this.favoriteFactsService.getFacts();

    this.filteredOptions = combineLatest([
      allFavoriteFacts,
      this.myControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([allFacts, searchValue]) =>
        allFacts.filter(fact =>
          fact.text.toLowerCase().includes(searchValue ? searchValue.toLowerCase(): '' )
        )
      )
    );
  }

  onOptionSelected(fact: RandomFact) {
    this.myControl.reset();
    this.selectedFact.emit(fact);
  }
}
