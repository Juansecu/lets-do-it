import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/categories/categories.page'),
  },
  {
    path: 'create-category',
    loadComponent: () => import('./pages/create-category/create-category.page')
  },
];

export default routes;
