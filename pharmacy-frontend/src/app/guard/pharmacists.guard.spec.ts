import { TestBed } from '@angular/core/testing';

import { PharmacistsGuard } from './pharmacists.guard';

describe('PharmacistsGuard', () => {
  let guard: PharmacistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PharmacistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
