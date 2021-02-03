import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalStuffClientsComponent } from './medical-stuff-clients.component';

describe('MedicalStuffClientsComponent', () => {
  let component: MedicalStuffClientsComponent;
  let fixture: ComponentFixture<MedicalStuffClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalStuffClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalStuffClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
