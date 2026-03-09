import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InternosService } from '../../shared/services/internosService';
import { Interno } from '../../shared/models/interno';

@Component({
  selector: 'app-internos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './internos.html',
  styleUrl: './internos.css'
})
export class Internos implements OnDestroy {
  internos: Interno[] = [];
  todosInternos: Interno[] = [];
  internoSelecionado: Interno | null = null;

  private subNovoInterno?: Subscription;
  private subPesquisa?: Subscription;

  internoForm = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    anoInternato: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(5)]
    }),
    estado: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor(protected internosService: InternosService) {
    this.carregarInternos();

    this.subNovoInterno = this.internosService.abrirNovoInterno.subscribe(() => {
      this.novoInterno();
    });

    this.subPesquisa = this.internosService.pesquisaNome.subscribe(texto => {
      this.filtrarPorNome(texto);
    });
  }

  ngOnDestroy(): void {
    this.subNovoInterno?.unsubscribe();
    this.subPesquisa?.unsubscribe();
  }

  carregarInternos(): void {
    this.todosInternos = this.internosService.getInternos();
    this.internos = [...this.todosInternos];
  }

  filtrarPorNome(texto: string): void {
    const termo = texto.trim().toLowerCase();

    if (!termo) {
      this.internos = [...this.todosInternos];
      return;
    }

    this.internos = this.todosInternos.filter(interno =>
      interno.nome.toLowerCase().includes(termo)
    );
  }

  novoInterno(): void {
    this.internoSelecionado = {
      id: 0,
      nome: '',
      anoInternato: 1,
      estado: ''
    };

    this.internoForm.reset({
      nome: '',
      anoInternato: 1,
      estado: ''
    });
  }

  editar(interno: Interno): void {
    this.internoSelecionado = { ...interno };

    this.internoForm.setValue({
      nome: interno.nome,
      anoInternato: Number(interno.anoInternato),
      estado: interno.estado
    });
  }

  guardar(): void {
    if (!this.internoSelecionado) return;

    if (this.internoForm.invalid) {
      this.internoForm.markAllAsTouched();
      return;
    }

    const interno: Interno = {
      id: this.internoSelecionado.id,
      nome: this.internoForm.value.nome!,
      anoInternato: Number(this.internoForm.value.anoInternato),
      estado: this.internoForm.value.estado!
    };

    if (interno.id === 0) {
      this.internosService.criarInterno(interno);
    } else {
      this.internosService.editarInterno(interno);
    }

    this.carregarInternos();
    this.internoSelecionado = null;

    this.internoForm.reset({
      nome: '',
      anoInternato: 1,
      estado: ''
    });
  }

  cancelar(): void {
    this.internoSelecionado = null;

    this.internoForm.reset({
      nome: '',
      anoInternato: 1,
      estado: ''
    });
  }

  apagar(id: number): void {
    this.internosService.apagarInterno(id);
    this.carregarInternos();
  }
}
