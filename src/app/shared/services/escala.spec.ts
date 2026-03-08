import { TestBed } from '@angular/core/testing';

import { Escala } from './escalaService';

describe('Escala', () => {
  let service: Escala;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Escala);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
