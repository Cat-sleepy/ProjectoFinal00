import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InternosService } from '../../shared/services/internosService';
import { Interno } from '../../shared/models/interno';
import { ModalComponent } from '../../modal/modal';

@Component({
  selector: 'app-internos',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './internos.html',
  styleUrl: './internos.css'
})
export class Internos implements OnDestroy {
  internos: Interno[] = [];
  todosInternos: Interno[] = [];

  modalAberto = false;
  internoEmEdicao: Interno | null = null;

  criterioOrdenacao: string = '';

  private subNovoInterno?: Subscription;
  private subPesquisa?: Subscription;
  private subAtualizacao?: Subscription;

  constructor(protected internosService: InternosService) {
    this.carregarInternos();

    this.subNovoInterno = this.internosService.abrirNovoInterno.subscribe(() => {
      this.abrirModalNovoInterno();
    });

    this.subPesquisa = this.internosService.pesquisaNome.subscribe(texto => {
      this.filtrarPorNome(texto);
    });

    this.subAtualizacao = this.internosService.internosAtualizados.subscribe(() => {
      this.carregarInternos();

      if (this.criterioOrdenacao) {
        this.ordenarInternos();
      }
    });
  }

  ngOnDestroy(): void {
    this.subNovoInterno?.unsubscribe();
    this.subPesquisa?.unsubscribe();
    this.subAtualizacao?.unsubscribe();
  }

  carregarInternos(): void {
    this.todosInternos = this.internosService.getInternos();
    this.internos = [...this.todosInternos];
  }

  filtrarPorNome(texto: string): void {
    const termo = texto.trim().toLowerCase();

    if (!termo) {
      this.internos = [...this.todosInternos];

      if (this.criterioOrdenacao) {
        this.ordenarInternos();
      }

      return;
    }

    this.internos = this.todosInternos.filter(interno =>
      interno.nome.toLowerCase().includes(termo)
    );

    if (this.criterioOrdenacao) {
      this.ordenarInternos();
    }
  }

  abrirModalNovoInterno(): void {
    this.internoEmEdicao = null;
    this.modalAberto = true;
    document.body.style.overflow = 'hidden';
  }

  editar(interno: Interno): void {
    this.internoEmEdicao = { ...interno };
    this.modalAberto = true;
    document.body.style.overflow = 'hidden';
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.internoEmEdicao = null;
    document.body.style.overflow = 'auto';
  }

  apagar(id: number): void {
    this.internosService.apagarInterno(id);
  }

  ordenarInternos(): void {
    if (this.criterioOrdenacao === 'nome') {
      this.internos.sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));
    }

    if (this.criterioOrdenacao === 'ano') {
      this.internos.sort((a, b) => Number(a.anoInternato) - Number(b.anoInternato));
    }
  }
}
