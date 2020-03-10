import { TestBed } from '@angular/core/testing';

import { GlobalGuard } from './global.guard';

describe('GlobalGuard', () => {
  let guard: GlobalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GlobalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
