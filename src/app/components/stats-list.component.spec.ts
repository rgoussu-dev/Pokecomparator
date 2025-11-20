import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsListComponent } from './stats-list.component';

describe('StatsListComponent', () => {
  let component: StatsListComponent;
  let fixture: ComponentFixture<StatsListComponent>;

  const mockStats = [
    { base_stat: 45, stat: { name: 'hp', url: '' } },
    { base_stat: 49, stat: { name: 'attack', url: '' } },
    { base_stat: 49, stat: { name: 'defense', url: '' } },
    { base_stat: 65, stat: { name: 'special-attack', url: '' } },
    { base_stat: 65, stat: { name: 'special-defense', url: '' } },
    { base_stat: 45, stat: { name: 'speed', url: '' } }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('stats', mockStats);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all six stats', () => {
    const statRows = fixture.nativeElement.querySelectorAll('.stat-row');
    expect(statRows.length).toBe(6);
  });

  it('should display HP stat correctly', () => {
    const statNames = fixture.nativeElement.querySelectorAll('.stat-name');
    const statValues = fixture.nativeElement.querySelectorAll('.stat-value');
    
    expect(statNames[0].textContent.trim()).toBe('HP');
    expect(statValues[0].textContent.trim()).toBe('45');
  });

  it('should display special-attack as "Sp. Attack"', () => {
    const statNames = fixture.nativeElement.querySelectorAll('.stat-name');
    expect(statNames[3].textContent.trim()).toBe('Sp. Attack');
  });

  it('should display special-defense as "Sp. Defense"', () => {
    const statNames = fixture.nativeElement.querySelectorAll('.stat-name');
    expect(statNames[4].textContent.trim()).toBe('Sp. Defense');
  });

  it('should display stat values correctly', () => {
    const statValues = fixture.nativeElement.querySelectorAll('.stat-value');
    expect(statValues[0].textContent.trim()).toBe('45');
    expect(statValues[1].textContent.trim()).toBe('49');
    expect(statValues[2].textContent.trim()).toBe('49');
    expect(statValues[3].textContent.trim()).toBe('65');
    expect(statValues[4].textContent.trim()).toBe('65');
    expect(statValues[5].textContent.trim()).toBe('45');
  });

  it('should have a title "Base Stats"', () => {
    const title = fixture.nativeElement.querySelector('.stats-title');
    expect(title.textContent.trim()).toBe('Base Stats');
  });
});
