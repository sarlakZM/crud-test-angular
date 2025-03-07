import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'customer',
    loadComponent: () => loadRemoteModule('customer', './Component').then((m) => m.AppComponent),
  },
  {
    path: '**',
    redirectTo: 'customer',
    pathMatch: 'full',
  },
];
