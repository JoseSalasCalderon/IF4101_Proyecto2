import { TestBed } from '@angular/core/testing';

import { DatosCuponService } from './datos-cupon.service';

describe('DatosCuponService', () => {
  let service: DatosCuponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCuponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
