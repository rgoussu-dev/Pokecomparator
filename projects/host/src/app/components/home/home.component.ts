import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Center, Cluster, Cover, Header, Stack } from '@ui';

@Component({
  selector: 'app-home',
  imports: [Header, Cover, Cluster, Center, Stack],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  readonly router = inject(Router);

  links: { label: string; href: string; callback: () => void }[] =  [
    { label: 'Catalog', href: '/catalog', callback: () => {
      this.router.navigate(['/catalog']);
    } },
    { label: 'Detail', href: '/detail', callback: () => {
      this.router.navigate(['/detail']);
    } },
    { label: 'Comparator', href: '/compare', callback: () => {
      this.router.navigate(['/compare']);
    } }
  ];

}
