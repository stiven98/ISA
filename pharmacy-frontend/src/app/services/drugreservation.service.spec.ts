import { TestBed } from '@angular/core/testing';

import { DrugreservationService } from './drugreservation.service';

describe('DrugreservationService', () => {
  let service: DrugreservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugreservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
