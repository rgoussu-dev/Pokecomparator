import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonSearch } from './components/pokemon-search/pokemon-search';
import { ComparisonContainer } from './components/comparison-container/comparison-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PokemonSearch, ComparisonContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
