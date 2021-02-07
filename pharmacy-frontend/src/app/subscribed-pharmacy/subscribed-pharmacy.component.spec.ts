import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedPharmacyComponent } from './subscribed-pharmacy.component';

describe('SubscribedPharmacyComponent', () => {
  let component: SubscribedPharmacyComponent;
  let fixture: ComponentFixture<SubscribedPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
