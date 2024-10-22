import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:"auth",
        loadChildren:() => import('./pages/auth-module/auth-module.module').then(m => m.AuthModuleModule) 
    },
    {
        path:"home",
        canActivate:[authGuard],
        loadChildren:() => import('./pages/home-module/home-module.module').then(m => m.HomeModuleModule)
    },
    {
        path:"**",
        redirectTo:"auth"
    }
];
