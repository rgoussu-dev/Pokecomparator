import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'detail',
        loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule)
    },
    {
        path: '**',
        component: NotFound
    }
];
