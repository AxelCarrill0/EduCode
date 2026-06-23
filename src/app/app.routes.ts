import { Routes } from '@angular/router';

export const routes: Routes = [
  //la importacion se realizo de esta manera ya que con esto se optimiza 
  // el rendimiento de la aplicacion lo que significa que los componentes 
  // solo se cargaran cuando sea necesario, es decir, cuando el usuario acceda 
  //a la ruta correspondiente
  
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/components/home-content/home-content.component')
        .then(m => m.HomeContentComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/register/components/register-content/register-content.component')
        .then(m => m.RegisterContentComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/login/components/login-content/login-content.component')
        .then(m => m.LoginContentComponent)
  },
  {
    path: 'platform',
    loadComponent: () =>
      import('./modules/platform/layout/layout-content/layout-content.component')
        .then(m => m.LayoutContentComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/platform/dashboard/dashboard-content/dashboard-content.component')
            .then(m => m.DashboardContentComponent)
      },
      {
        path: 'modules',
        loadComponent: () =>
          import('./modules/platform/modules/modules-content/modules-content.component')
            .then(m => m.ModulesContentComponent)
      },
      {
        path: 'module/:id',
        loadComponent: () =>
          import('./modules/platform/modules/module-detail/module-detail.component')
            .then(m => m.ModuleDetailComponent)
      },
      {
        path: 'laboratory',
        loadComponent: () =>
          import('./modules/platform/laboratory/laboratory-content/laboratory-content.component')
            .then(m => m.LaboratoryContentComponent)
      },
      {
        path: 'progress',
        loadComponent: () =>
          import('./modules/platform/progress/progress-content/progress-content.component')
            .then(m => m.ProgressContentComponent)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./modules/platform/settings/settings-content/settings-content.component')
            .then(m => m.SettingsContentComponent)
      },
      {
        path: 'settings/profile',
        loadComponent: () =>
          import('./modules/platform/settings/profile/profile.component')
            .then(m => m.ProfileComponent)
      },
      {
        path: 'settings/change-password',
        loadComponent: () =>
          import('./modules/platform/settings/change-password/change-password.component')
            .then(m => m.ChangePasswordComponent)
      },
      {
        path: 'settings/delete-account',
        loadComponent: () =>
          import('./modules/platform/settings/delete-account/delete-account.component')
            .then(m => m.DeleteAccountComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
