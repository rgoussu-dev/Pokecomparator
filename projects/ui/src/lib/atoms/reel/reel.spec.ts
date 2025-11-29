import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reel } from './reel';

describe('Reel', () => {
  let component: Reel;
  let fixture: ComponentFixture<Reel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
