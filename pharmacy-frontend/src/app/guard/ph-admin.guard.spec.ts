import { TestBed } from '@angular/core/testing';

import { PhAdminGuard } from './ph-admin.guard';

describe('PhAdminGuard', () => {
  let guard: PhAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PhAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
