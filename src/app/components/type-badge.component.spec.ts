import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeBadgeComponent } from './type-badge.component';

describe('TypeBadgeComponent', () => {
  let component: TypeBadgeComponent;
  let fixture: ComponentFixture<TypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('type', 'fire');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display type name capitalized', () => {
    fixture.componentRef.setInput('type', 'electric');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.type-badge');
    expect(badge.textContent.trim()).toBe('Electric');
  });

  it('should apply correct color for fire type', () => {
    fixture.componentRef.setInput('type', 'fire');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.type-badge') as HTMLElement;
    expect(badge.style.backgroundColor).toBe('rgb(240, 128, 48)'); // #F08030
  });

  it('should apply correct color for water type', () => {
    fixture.componentRef.setInput('type', 'water');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.type-badge') as HTMLElement;
    expect(badge.style.backgroundColor).toBe('rgb(104, 144, 240)'); // #6890F0
  });

  it('should apply correct color for grass type', () => {
    fixture.componentRef.setInput('type', 'grass');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.type-badge') as HTMLElement;
    expect(badge.style.backgroundColor).toBe('rgb(120, 200, 80)'); // #78C850
  });

  it('should apply default color for unknown type', () => {
    fixture.componentRef.setInput('type', 'unknown');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.type-badge') as HTMLElement;
    expect(badge.style.backgroundColor).toBe('rgb(119, 119, 119)'); // #777
  });

  it('should handle uppercase type names', () => {
    fixture.componentRef.setInput('type', 'PSYCHIC');
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.type-badge');
    expect(badge.textContent.trim()).toBe('PSYCHIC');
  });
});
