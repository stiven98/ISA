import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartExaminationPageComponent } from './start-examination-page.component';

describe('StartExaminationPageComponent', () => {
  let component: StartExaminationPageComponent;
  let fixture: ComponentFixture<StartExaminationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartExaminationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartExaminationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
