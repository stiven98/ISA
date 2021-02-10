import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentIssuingComponent } from './medicament-issuing.component';

describe('MedicamentIssuingComponent', () => {
  let component: MedicamentIssuingComponent;
  let fixture: ComponentFixture<MedicamentIssuingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicamentIssuingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentIssuingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
