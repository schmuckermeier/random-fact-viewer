import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {mockRandomFact} from './testing/mockRandomFacts';
import {RandomFactService} from './services/random-fact.service';
import {of} from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  let mockRandomFactService = {
    getRandomFact: jest.fn(() => of(mockRandomFact))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {provide: RandomFactService, useValue: mockRandomFactService}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with initial state', () => {
    expect(fixture).toMatchSnapshot();
  });
});
