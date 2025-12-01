import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'compare',
        loadChildren: () => import('./compare/compare.module').then(m => m.CompareModule)
    },
    {
        path: '**',
        component: NotFound
    }
];
