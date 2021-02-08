import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSchedulingComponent } from './employee-scheduling.component';

describe('EmployeeSchedulingComponent', () => {
  let component: EmployeeSchedulingComponent;
  let fixture: ComponentFixture<EmployeeSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSchedulingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
