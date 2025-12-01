import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

export const APP_ROUTES: Routes = [
    {
        title: 'Home',
        path: '',
        component: HomeComponent
    },
    {
        title: 'Pokemon Catalog',
        path: 'catalog',
        loadChildren: () => loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4210/remoteEntry.js',
            exposedModule: './CatalogModule'
        }).then(m => m.CatalogModule)
    },
    {
        title: 'Detail',
        path: 'detail',
        loadChildren: () => loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4220/remoteEntry.js',
            exposedModule: './DetailModule'
        }).then(m => m.DetailModule)
    },
    {
        title: 'Comparator',
        path: 'compare',
        loadChildren: () => loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4230/remoteEntry.js',
            exposedModule: './CompareModule'
        }).then(m => m.CompareModule)
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
