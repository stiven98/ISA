import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllPharmacistComponent } from './see-all-pharmacist.component';

describe('SeeAllPharmacistComponent', () => {
  let component: SeeAllPharmacistComponent;
  let fixture: ComponentFixture<SeeAllPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAllPharmacistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAllPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
