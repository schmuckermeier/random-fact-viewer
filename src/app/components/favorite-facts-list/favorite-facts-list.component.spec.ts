import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFactsListComponent } from './favorite-facts-list.component';

describe('FavoriteFactsListComponent', () => {
  let component: FavoriteFactsListComponent;
  let fixture: ComponentFixture<FavoriteFactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteFactsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteFactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
