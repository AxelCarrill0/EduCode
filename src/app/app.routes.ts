import { Routes } from '@angular/router';
import { HomeContentComponent } from './modules/home/components/home-content/home-content.component';
import { RegisterContentComponent } from './modules/register/components/register-content/register-content.component';
import { LoginContentComponent } from './modules/login/components/login-content/login-content.component';
import { LayoutContentComponent } from './modules/platform/layout/layout-content/layout-content.component';
import { DashboardContentComponent } from './modules/platform/dashboard/dashboard-content/dashboard-content.component';
import { ModulesContentComponent } from './modules/platform/modules/modules-content/modules-content.component';
import { LaboratoryContentComponent } from './modules/platform/laboratory/laboratory-content/laboratory-content.component';
import { ProgressContentComponent } from './modules/platform/progress/progress-content/progress-content.component';
import { SettingsContentComponent } from './modules/platform/settings/settings-content/settings-content.component';

export const routes: Routes = [
    { path: '', component: HomeContentComponent },
    { path: 'register', component: RegisterContentComponent },
    { path: 'login', component: LoginContentComponent },
    { path: 'platform', component: LayoutContentComponent, 
    children: [
        { path: 'dashboard', component: DashboardContentComponent },
        { path: 'modules', component: ModulesContentComponent },
        { path: 'laboratory', component: LaboratoryContentComponent },
        { path: 'progress', component: ProgressContentComponent },
        { path: 'settings', component: SettingsContentComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ] },
    { path: '**', redirectTo: '' }

];
