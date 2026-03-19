import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Internos } from './pages/internos/internos';
import { Escalas } from './pages/escala/escala';
import { Relatorios } from './pages/relatorios/relatorios';
import { ModalComponent } from './modal/modal';
import { AuthGuard } from './pages/features/auth/services/auth.guard';

export const routes: Routes = [
  // Rotas de Autenticação (sem proteção)
  {
    path: 'auth',
    loadChildren: () => import('./pages/features/auth/auth.module').then(m => m.AuthModule)
  },

  // Rotas Protegidas (com AuthGuard)
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: 'internos',
    component: Internos,
    canActivate: [AuthGuard]
  },
  {
    path: 'escala',
    component: Escalas,
    canActivate: [AuthGuard]
  },
  {
    path: 'relatorios',
    component: Relatorios,
    canActivate: [AuthGuard]
  },
  {
    path: 'modal',
    component: ModalComponent,
    canActivate: [AuthGuard]
  },

  // Redirecionamento padrão
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Fallback para rotas não encontradas
  { path: '**', redirectTo: '/auth/login' }
];