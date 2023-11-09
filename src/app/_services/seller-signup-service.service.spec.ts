import { TestBed } from '@angular/core/testing';

import { SellerSignupServiceService } from './seller-signup-service.service';

describe('SellerSignupServiceService', () => {
  let service: SellerSignupServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerSignupServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
