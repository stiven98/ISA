import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DermatologistHomeComponent } from './dermatologist-home.component';

describe('DermatologistHomeComponent', () => {
  let component: DermatologistHomeComponent;
  let fixture: ComponentFixture<DermatologistHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DermatologistHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DermatologistHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
