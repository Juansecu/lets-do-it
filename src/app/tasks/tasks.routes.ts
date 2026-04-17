import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tasks/tasks.page'),
  },
  {
    path: 'create-task',
    loadComponent: () => import('./pages/create-task/create-task.page')
  },
  {
    path: ':taskId',
    loadComponent: () => import('./pages/task/task.page')
  }

];

export default routes;
