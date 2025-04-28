import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchInputComponent } from './search-input.component';
import {of} from 'rxjs';
import {mockRandomFacts} from '../../testing/mockRandomFacts';
import {FavoriteFactsService} from '../../services/favorite-facts.service';
import {queryById} from '../../testing/testing-utils';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  let mockFavoriteFactsService = {
    getFacts: jest.fn(() => of(mockRandomFacts))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchInputComponent,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        {provide: FavoriteFactsService, useValue: mockFavoriteFactsService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render correctly', () => {
    expect(fixture).toMatchSnapshot();
    expect(mockFavoriteFactsService.getFacts).toHaveBeenCalled();
  });

  it('should show all options', async () => {
    const input = queryById(fixture, "searchInput").nativeElement;
    input.focus();
    fixture.detectChanges();

    // Allow autocomplete dropdown to open
    await fixture.whenStable();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent).toContain(mockRandomFacts[0].text);
    expect(options[1].nativeElement.textContent).toContain(mockRandomFacts[1].text);
    expect(options[2].nativeElement.textContent).toContain(mockRandomFacts[2].text);
  });

  it('should select first options', async () => {
    const input = queryById(fixture, "searchInput").nativeElement;

    jest.spyOn(component.selectedFact, 'emit');

    input.focus();
    input.value = "Golf courses cover";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Allow autocomplete dropdown to open
    await fixture.whenStable();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(options.length).toBe(1);
    const firstRandomFact = mockRandomFacts[0];
    expect(options[0].nativeElement.textContent).toContain(firstRandomFact.text);

    options[0].triggerEventHandler('onSelectionChange', { isUserInput: true });
    fixture.detectChanges();

    expect(component.selectedFact.emit).toHaveBeenCalledWith(firstRandomFact);
  });
});
