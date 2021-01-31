import { TestBed } from '@angular/core/testing';
import { DermatologistsGuard } from './dermatologists.guard';

describe('DermatologistsGuard', () => {
  let guard: DermatologistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DermatologistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
