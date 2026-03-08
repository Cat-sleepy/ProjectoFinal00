import { Interno } from './interno';

export interface Escala {
  id: number;
  data: string;
  internos: Interno[];
  atribuicao: 'Urgência Dia' | 'Urgência Noite' | 'Residência Noite';
}
