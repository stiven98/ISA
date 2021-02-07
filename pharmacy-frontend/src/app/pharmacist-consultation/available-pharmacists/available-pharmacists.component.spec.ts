import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePharmacistsComponent } from './available-pharmacists.component';

describe('AvailablePharmacistsComponent', () => {
  let component: AvailablePharmacistsComponent;
  let fixture: ComponentFixture<AvailablePharmacistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePharmacistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePharmacistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
