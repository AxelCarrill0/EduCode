import { Routes } from '@angular/router';
import { HomeContentComponent } from './modules/home/components/home-content/home-content.component';


export const routes: Routes = [
    { path: '', component: HomeContentComponent },
    { path: '**', redirectTo: '' }
];
