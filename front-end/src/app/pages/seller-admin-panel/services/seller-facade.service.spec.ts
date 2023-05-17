import { TestBed } from '@angular/core/testing';

import { SellerFacadeService } from './seller-facade.service';

describe('SellerFacadeService', () => {
  let service: SellerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
