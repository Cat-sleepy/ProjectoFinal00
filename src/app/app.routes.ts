import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Internos } from './pages/internos/internos';
import { Escalas } from './pages/escala/escala';
// import { Indisponibilidades } from './indisponibilidades/indisponibilidades';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'internos', component: Internos },
  { path: 'escala', component: Escalas },
//   { path: 'indisponibilidades', component: Indisponibilidades }
// { path: 'relatorios', component: Relatorios }
];