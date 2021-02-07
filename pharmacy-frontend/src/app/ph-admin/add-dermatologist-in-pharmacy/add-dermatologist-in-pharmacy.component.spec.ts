import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDermatologistInPharmacyComponent } from './add-dermatologist-in-pharmacy.component';

describe('AddDermatologistInPharmacyComponent', () => {
  let component: AddDermatologistInPharmacyComponent;
  let fixture: ComponentFixture<AddDermatologistInPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDermatologistInPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDermatologistInPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
