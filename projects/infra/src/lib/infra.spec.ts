import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Infra } from './infra';

describe('Infra', () => {
  let component: Infra;
  let fixture: ComponentFixture<Infra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Infra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Infra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
