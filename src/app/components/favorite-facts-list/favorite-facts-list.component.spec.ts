import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteFactsListComponent } from './favorite-facts-list.component';
import {FavoriteFactsService} from '../../services/favorite-facts.service';
import {of} from 'rxjs';
import {mockRandomFacts} from '../../testing/mockRandomFacts';
import {queryById} from '../../testing/testing-utils';

describe('FavoriteFactsListComponent', () => {
  let fixture: ComponentFixture<FavoriteFactsListComponent>;

  let mockFavoriteFactsService = {
    getFacts: jest.fn(() => of(mockRandomFacts)),
    removeFact: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteFactsListComponent],
      providers: [{provide: FavoriteFactsService, useValue: mockFavoriteFactsService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteFactsListComponent);
    fixture.detectChanges();
  });

  it('should render with initial data in table', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should remove favorite fact on click', () => {
    const firstRandomFact = mockRandomFacts[0];
    const deleteButton = queryById(fixture, "delete-" + firstRandomFact.id)
    deleteButton.nativeElement.click();

    expect(mockFavoriteFactsService.removeFact).toHaveBeenCalledWith(firstRandomFact);
  })
});
