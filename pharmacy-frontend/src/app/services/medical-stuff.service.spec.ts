import { TestBed } from '@angular/core/testing';

import { MedicalStuffService } from './medical-stuff.service';

describe('MedicalStuffService', () => {
  let service: MedicalStuffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalStuffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
