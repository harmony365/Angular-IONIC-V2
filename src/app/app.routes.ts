import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'home/:id',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'home-defer',
    loadComponent: () => import('./home-defer/home-defer.page').then( m => m.HomeDeferPage)
  },
];
