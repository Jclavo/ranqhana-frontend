import { TestBed } from '@angular/core/testing';

import { OrderStageService } from './order-stage.service';

describe('OrderStageService', () => {
  let service: OrderStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
