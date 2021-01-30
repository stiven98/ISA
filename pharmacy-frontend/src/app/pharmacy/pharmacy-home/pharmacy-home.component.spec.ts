import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyHomeComponent } from './pharmacy-home.component';

describe('PharmacyHomeComponent', () => {
  let component: PharmacyHomeComponent;
  let fixture: ComponentFixture<PharmacyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
