import { TestBed } from '@angular/core/testing';

import { CustomAdapterService } from './custom-adapter.service';

describe('CustomAdapterService', () => {
  let service: CustomAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
