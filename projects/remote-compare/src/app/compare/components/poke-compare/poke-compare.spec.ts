import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCompare } from './poke-compare';

describe('PokeCompare', () => {
  let component: PokeCompare;
  let fixture: ComponentFixture<PokeCompare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeCompare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeCompare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
