import { Component, input, computed, effect, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';

interface StatComparison {
  name: string;
  displayName: string;
  pokemon1Value: number;
  pokemon2Value: number;
  difference: number;
  winner: 'pokemon1' | 'pokemon2' | 'tie';
}

@Component({
  selector: 'app-comparison-chart',
  imports: [CommonModule],
  templateUrl: './comparison-chart.html',
  styleUrl: './comparison-chart.css',
})
export class ComparisonChart {
  pokemon1 = input.required<Pokemon>();
  pokemon2 = input.required<Pokemon>();
  
  canvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  stats = computed(() => {
    const p1 = this.pokemon1();
    const p2 = this.pokemon2();
    
    const statComparisons: StatComparison[] = [];
    
    for (let i = 0; i < p1.stats.length; i++) {
      const stat1 = p1.stats[i];
      const stat2 = p2.stats[i];
      const difference = stat1.base_stat - stat2.base_stat;
      
      statComparisons.push({
        name: stat1.stat.name,
        displayName: this.getStatDisplayName(stat1.stat.name),
        pokemon1Value: stat1.base_stat,
        pokemon2Value: stat2.base_stat,
        difference,
        winner: difference > 0 ? 'pokemon1' : difference < 0 ? 'pokemon2' : 'tie'
      });
    }
    
    return statComparisons;
  });

  constructor() {
    effect(() => {
      // Trigger re-render when pokemon change
      const p1 = this.pokemon1();
      const p2 = this.pokemon2();
      if (p1 && p2) {
        this.drawRadarChart();
      }
    });
  }

  private getStatDisplayName(statName: string): string {
    const statNames: Record<string, string> = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Sp. Attack',
      'special-defense': 'Sp. Defense',
      'speed': 'Speed'
    };
    return statNames[statName.toLowerCase()] || statName;
  }

  private drawRadarChart(): void {
    const canvasRef = this.canvas();
    if (!canvasRef) return;
    
    const canvas = canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 40;
    const stats = this.stats();
    const numberOfStats = stats.length;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw concentric circles for scale
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      const radius = (maxRadius / 5) * i;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    for (let i = 0; i < numberOfStats; i++) {
      const angle = (Math.PI * 2 / numberOfStats) * i - Math.PI / 2;
      const x = centerX + maxRadius * Math.cos(angle);
      const y = centerY + maxRadius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Draw labels
      const labelRadius = maxRadius + 25;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);
      
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stats[i].displayName, labelX, labelY);
    }
    
    // Draw Pokemon 1 data
    this.drawPokemonData(ctx, centerX, centerY, maxRadius, stats.map(s => s.pokemon1Value), '#FF6B6B', 0.3);
    
    // Draw Pokemon 2 data
    this.drawPokemonData(ctx, centerX, centerY, maxRadius, stats.map(s => s.pokemon2Value), '#4ECDC4', 0.3);
  }

  private drawPokemonData(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    maxRadius: number,
    values: number[],
    color: string,
    opacity: number
  ): void {
    const numberOfStats = values.length;
    const maxStatValue = 255;
    
    ctx.beginPath();
    
    for (let i = 0; i < numberOfStats; i++) {
      const angle = (Math.PI * 2 / numberOfStats) * i - Math.PI / 2;
      const value = values[i];
      const radius = (value / maxStatValue) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    
    // Fill
    ctx.fillStyle = color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
    ctx.fill();
    
    // Stroke
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  getIndicatorIcon(winner: 'pokemon1' | 'pokemon2' | 'tie'): string {
    return winner === 'tie' ? '=' : winner === 'pokemon1' ? '↑' : '↓';
  }

  getIndicatorClass(winner: 'pokemon1' | 'pokemon2' | 'tie'): string {
    return winner === 'tie' ? 'tie' : winner === 'pokemon1' ? 'higher' : 'lower';
  }
}

