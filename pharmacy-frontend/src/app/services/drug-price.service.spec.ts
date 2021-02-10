import { TestBed } from '@angular/core/testing';

import { DrugPriceService } from './drug-price.service';

describe('DrugPriceService', () => {
  let service: DrugPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
