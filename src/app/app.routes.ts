import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Internos } from './pages/internos/internos';
import { Escalas } from './pages/escala/escala';
import { DetalheEscala } from './pages/detalhe-escala/detalhe-escala';
import { Relatorios } from './pages/relatorios/relatorios';
import { ModalComponent } from './modal/modal';
// import { Indisponibilidades } from './indisponibilidades/indisponibilidades';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'internos', component: Internos },
  { path: 'escala', component: Escalas},
//   { path: 'indisponibilidades', component: Indisponibilidades }
  { path: 'relatorios', component: Relatorios },
  {path: 'modal', component: ModalComponent},
];