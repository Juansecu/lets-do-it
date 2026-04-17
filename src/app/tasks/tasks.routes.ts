import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tasks/tasks.page'),
  }
];

export default routes;
