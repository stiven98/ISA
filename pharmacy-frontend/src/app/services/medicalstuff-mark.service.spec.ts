import { TestBed } from '@angular/core/testing';

import { MedicalstuffMarkService } from './medicalstuff-mark.service';

describe('MedicalstuffMarkService', () => {
  let service: MedicalstuffMarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalstuffMarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
