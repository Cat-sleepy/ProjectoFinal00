import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Escala } from './escala';

describe('Escala', () => {
  let component: Escala;
  let fixture: ComponentFixture<Escala>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escala],
    }).compileComponents();

    fixture = TestBed.createComponent(Escala);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
