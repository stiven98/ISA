import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DermatologistExaminationComponent } from './dermatologist-examination.component';

describe('DermatologistExaminationComponent', () => {
  let component: DermatologistExaminationComponent;
  let fixture: ComponentFixture<DermatologistExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
