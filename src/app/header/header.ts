import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InternosService } from '../shared/services/internosService';
import { EscalaService } from '../shared/services/escalaService';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  logo: string = 'logo.png';
  titulo: string = '';

  constructor(
    private internosService: InternosService,
    private escalaService: EscalaService,
    private router: Router
) {}

  irDashboard() {
  this.router.navigate(['/dashboard']);
  }

  novoInterno() {
    this.router.navigate(['/internos']).then(() => {
      this.internosService.triggerNovoInterno();
    });
  }

  novaAtribuicao() {
    this.router.navigate(['/escala']).then(() => {
      this.escalaService.triggerNovaEscala();
    });
  }

}
