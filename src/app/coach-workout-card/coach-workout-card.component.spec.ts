import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachWorkoutCardComponent } from './coach-workout-card.component';

describe('CoachWorkoutCardComponent', () => {
  let component: CoachWorkoutCardComponent;
  let fixture: ComponentFixture<CoachWorkoutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachWorkoutCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachWorkoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
