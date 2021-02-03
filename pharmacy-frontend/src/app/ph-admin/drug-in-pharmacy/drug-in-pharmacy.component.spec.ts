import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugInPharmacyComponent } from './drug-in-pharmacy.component';

describe('DrugInPharmacyComponent', () => {
  let component: DrugInPharmacyComponent;
  let fixture: ComponentFixture<DrugInPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugInPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugInPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
