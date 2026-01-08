import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
    data: { title: 'Login' },
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
        data: { title: 'Dashboard' },
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./pages/employees/employees').then((m) => m.EmployeesComponent),
        data: { title: 'Employees' },
      },
      {
        path: 'schedule',
        loadComponent: () => import('./pages/schedule/schedule').then((m) => m.ScheduleComponent),
        data: { title: 'Schedule' },
      },
      {
        path: 'document',
        loadComponent: () => import('./pages/document/document').then((m) => m.DocumentComponent),
        data: { title: 'Document' },
      },
      {
        path: 'time-off',
        loadComponent: () => import('./pages/time-off/time-off').then((m) => m.TimeOffComponent),
        data: { title: 'Time Attendance' },
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then((m) => m.SettingsComponent),
        data: { title: 'Settings' },
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
