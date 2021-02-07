import { TestBed } from '@angular/core/testing';

import { DrugMarksService } from './drug-marks.service';

describe('DrugMarksService', () => {
  let service: DrugMarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugMarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
