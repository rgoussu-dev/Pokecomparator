import { Component, input } from '@angular/core';

const STAT_NAMES: { [key: string]: string } = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  'speed': 'Speed'
};

interface Stat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

@Component({
  selector: 'app-stats-list',
  template: `
    <div class="stats-container">
      <h3 class="stats-title">Base Stats</h3>
      <div class="stats-list">
        @for (stat of stats(); track stat.stat.name) {
          <div class="stat-row">
            <span class="stat-name">{{ getStatName(stat.stat.name) }}</span>
            <span class="stat-value">{{ stat.base_stat }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .stats-container {
      width: 100%;
    }

    .stats-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
      color: #333;
    }

    .stats-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background-color: #f5f5f5;
      border-radius: 0.25rem;
    }

    .stat-name {
      font-weight: 500;
      color: #555;
      min-width: 7rem;
    }

    .stat-value {
      font-weight: 700;
      color: #333;
      font-size: 1.125rem;
    }
  `]
})
export class StatsListComponent {
  stats = input.required<Stat[]>();

  getStatName(apiName: string): string {
    return STAT_NAMES[apiName.toLowerCase()] || apiName;
  }
}
