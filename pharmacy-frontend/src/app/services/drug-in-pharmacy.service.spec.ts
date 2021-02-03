import { TestBed } from '@angular/core/testing';

import { DrugInPharmacyService } from './drug-in-pharmacy.service';

describe('DrugInPharmacyService', () => {
  let service: DrugInPharmacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugInPharmacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
