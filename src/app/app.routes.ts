import { Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { editOwnUserGuard } from './guards/edit-own-user.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component'),
        canActivate: [NoAuthGuard]
    },
    {
        path: '',
        loadComponent: () => import('./client/layout.component')
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/layout.component'),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./admin/pages/home/home.component')
            },
            {
                path: 'edit-usuario/:id',
                canActivate: [editOwnUserGuard],
                loadComponent: () => import('./admin/pages/edit-usuario/edit-usuario.component')
            },
            {
                path: 'datos',
                loadComponent: () => import('./admin/pages/datos/datos.component')
            },
            {
                path: 'contactos',
                loadComponent: () => import('./admin/pages/contactos/contactos.component')
            },
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }

];
