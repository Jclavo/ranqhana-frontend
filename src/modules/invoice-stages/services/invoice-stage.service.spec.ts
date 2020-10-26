import { TestBed } from '@angular/core/testing';

import { InvoiceStageService } from './invoice-stage.service';

describe('InvoiceStageService', () => {
  let service: InvoiceStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
