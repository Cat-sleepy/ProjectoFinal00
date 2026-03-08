import { TestBed } from '@angular/core/testing';

import { Internos } from './internos';

describe('Internos', () => {
  let service: Internos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Internos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
