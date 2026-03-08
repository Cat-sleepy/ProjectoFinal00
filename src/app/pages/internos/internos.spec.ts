import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Internos } from './internos';

describe('Internos', () => {
  let component: Internos;
  let fixture: ComponentFixture<Internos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Internos],
    }).compileComponents();

    fixture = TestBed.createComponent(Internos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
