import { TestBed } from '@angular/core/testing';

import { PaymentStageService } from './payment-stage.service';

describe('PaymentStageService', () => {
  let service: PaymentStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
