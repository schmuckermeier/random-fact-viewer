import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FactViewerComponent} from './fact-viewer.component';
import {RandomFactService} from '../../services/random-fact.service';
import {mockRandomFact, mockRandomFacts} from '../../testing/mockRandomFacts';
import {of} from 'rxjs';
import {FavoriteFactsService} from '../../services/favorite-facts.service';
import {queryById} from '../../testing/testing-utils';

describe('FactViewerComponent', () => {
  let component: FactViewerComponent;
  let fixture: ComponentFixture<FactViewerComponent>;
  let favoriteFactsService: FavoriteFactsService;

  let mockRandomFactService = {
    getRandomFact: jest.fn(() => of(mockRandomFact))
  };

  let mockFavoriteFactsService = {
    saveFact: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactViewerComponent],
      providers: [
        {provide: FavoriteFactsService, useValue: mockFavoriteFactsService},
        {provide: RandomFactService, useValue: mockRandomFactService}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FactViewerComponent);
    component = fixture.componentInstance;
    favoriteFactsService = TestBed.inject(FavoriteFactsService);

    fixture.detectChanges();
  });

  it('should render with initial fact and buttons', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should load first random fact', () => {
    expect(component.currentRandomFact()).toEqual(mockRandomFact);
  });

  it('should load next random fact on click', () => {
    queryById(fixture, "loadFact").nativeElement.click();
    expect(mockRandomFactService.getRandomFact).toHaveBeenCalled();
  });

  it('should save random fact on click', () => {
    queryById(fixture, "saveFact").nativeElement.click();
    expect(favoriteFactsService.saveFact).toHaveBeenCalledWith(mockRandomFact);
  });

  it('should show selected fact if it was set', () => {
    const nextRandomFact = mockRandomFacts[1];
    component.selectedFact = nextRandomFact;
    fixture.detectChanges();
    const viewerContent = queryById(fixture, "viewerContent").nativeElement.innerHTML;
    expect(viewerContent).toEqual(nextRandomFact.text);
  });
});
