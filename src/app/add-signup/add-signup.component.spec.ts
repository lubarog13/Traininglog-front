import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSognupComponent } from './add-signup.component';

describe('AddSognupComponent', () => {
  let component: AddSognupComponent;
  let fixture: ComponentFixture<AddSognupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSognupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSognupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
