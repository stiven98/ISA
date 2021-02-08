import { TestBed } from '@angular/core/testing';

import { ExaminationPriceService } from './examination-price.service';

describe('ExaminationPriceService', () => {
  let service: ExaminationPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminationPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
