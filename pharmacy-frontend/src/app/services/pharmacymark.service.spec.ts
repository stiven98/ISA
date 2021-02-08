import { TestBed } from '@angular/core/testing';

import { PharmacymarkService } from './pharmacymark.service';

describe('PharmacymarkService', () => {
  let service: PharmacymarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacymarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
