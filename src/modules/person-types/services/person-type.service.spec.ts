import { TestBed } from '@angular/core/testing';

import { PersonTypeService } from './person-type.service';

describe('PersonTypeService', () => {
  let service: PersonTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
