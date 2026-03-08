import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Escalas } from './escala';

describe('Escala', () => {
  let component: Escalas;
  let fixture: ComponentFixture<Escalas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escalas],
    }).compileComponents();

    fixture = TestBed.createComponent(Escalas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
