import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMarksComponent } from './patient-marks.component';

describe('PatientMarksComponent', () => {
  let component: PatientMarksComponent;
  let fixture: ComponentFixture<PatientMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
