import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDermatologistComponent } from './new-dermatologist.component';

describe('NewDermatologistComponent', () => {
  let component: NewDermatologistComponent;
  let fixture: ComponentFixture<NewDermatologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDermatologistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDermatologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
