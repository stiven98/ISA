import { TestBed } from '@angular/core/testing';

import { DrugOrderService } from './drug-order.service';

describe('DrugOrderService', () => {
  let service: DrugOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
