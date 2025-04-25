import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactViewerComponent } from './fact-viewer.component';

describe('FactViewerComponent', () => {
  let component: FactViewerComponent;
  let fixture: ComponentFixture<FactViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
