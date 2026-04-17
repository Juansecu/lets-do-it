import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/categories/categories.page'),
  },
  {
    path: 'create-category',
    loadComponent: () => import('./pages/save-category/./save-category.page')
  },
  {
    path: ':categoryId',
    loadComponent: () => import('./pages/save-category/save-category.page')
  }
];

export default routes;
