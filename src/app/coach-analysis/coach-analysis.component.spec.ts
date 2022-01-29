import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAnalysisComponent } from './coach-analysis.component';

describe('CoachAnalysisComponent', () => {
  let component: CoachAnalysisComponent;
  let fixture: ComponentFixture<CoachAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
