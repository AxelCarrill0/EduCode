import { Routes } from '@angular/router';
import { HomeContentComponent } from './modules/home/components/home-content/home-content.component';
import { RegisterContentComponent } from './modules/register/components/register-content/register-content.component';
import { LoginContentComponent } from './modules/login/components/login-content/login-content.component';

export const routes: Routes = [
    { path: '', component: HomeContentComponent },
    { path: 'register', component: RegisterContentComponent },
    { path: 'login', component: LoginContentComponent },
    { path: '**', redirectTo: '' }

];
