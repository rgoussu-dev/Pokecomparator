import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { ComparisonChart } from '../comparison-chart/comparison-chart';

@Component({
  selector: 'app-comparison-container',
  imports: [CommonModule, PokemonCard, ComparisonChart],
  templateUrl: './comparison-container.html',
  styleUrl: './comparison-container.css',
})
export class ComparisonContainer {
  protected readonly comparisonService = inject(ComparisonService);

  onClearComparison(): void {
    this.comparisonService.clearComparison();
  }

  onSwapPokemon(): void {
    this.comparisonService.swapPokemon();
  }

  onChangePokemon1(): void {
    this.comparisonService.setPokemon1(null);
  }

  onChangePokemon2(): void {
    this.comparisonService.setPokemon2(null);
  }
}

