import { TestBed } from '@angular/core/testing';

import { SellerLoginService } from './seller-login.service';

describe('SellerLoginService', () => {
  let service: SellerLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
