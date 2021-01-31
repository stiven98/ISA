import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhAdminComponent } from './ph-admin.component';

describe('PhAdminComponent', () => {
  let component: PhAdminComponent;
  let fixture: ComponentFixture<PhAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
