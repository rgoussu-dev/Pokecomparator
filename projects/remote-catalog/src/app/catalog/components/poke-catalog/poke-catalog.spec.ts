import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCatalog } from './poke-catalog';

describe('PokeCatalog', () => {
  let component: PokeCatalog;
  let fixture: ComponentFixture<PokeCatalog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeCatalog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeCatalog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
