import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistConsultationComponent } from './pharmacist-consultation.component';

describe('PharmacistConsultationComponent', () => {
  let component: PharmacistConsultationComponent;
  let fixture: ComponentFixture<PharmacistConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacistConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
