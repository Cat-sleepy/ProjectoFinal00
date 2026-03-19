import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InternosService } from '../shared/services/internosService';
import { EscalaService } from '../shared/services/escalaService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  logo = 'logo.png';
  titulo = '';
  textoPesquisa = '';

  private internosService = inject(InternosService);
  private escalaService = inject(EscalaService);
  private router = inject(Router);

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

  pesquisarPorNome() {
    this.internosService.atualizarPesquisaNome(this.textoPesquisa);
  }
}