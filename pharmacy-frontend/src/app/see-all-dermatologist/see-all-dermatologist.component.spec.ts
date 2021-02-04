import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllDermatologistComponent } from './see-all-dermatologist.component';

describe('SeeAllDermatologistComponent', () => {
  let component: SeeAllDermatologistComponent;
  let fixture: ComponentFixture<SeeAllDermatologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAllDermatologistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAllDermatologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
