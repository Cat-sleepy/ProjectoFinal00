import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEscala } from './detalhe-escala';

describe('DetalheEscala', () => {
  let component: DetalheEscala;
  let fixture: ComponentFixture<DetalheEscala>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheEscala],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheEscala);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
