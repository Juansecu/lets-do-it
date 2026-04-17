import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.routes'),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.routes'),
  },
];
