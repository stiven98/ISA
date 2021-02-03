import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPharmacyComponent } from './new-pharmacy.component';

describe('NewPharmacyComponent', () => {
  let component: NewPharmacyComponent;
  let fixture: ComponentFixture<NewPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
