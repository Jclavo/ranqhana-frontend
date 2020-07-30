import { TestBed } from '@angular/core/testing';

import { StockTypesService } from './stock-types.service';

describe('StockTypesService', () => {
  let service: StockTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
