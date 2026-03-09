import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { EscalaService } from '../../shared/services/escalaService';
import { InternosService } from '../../shared/services/internosService';
import { Escala } from '../../shared/models/escala';
import { Interno } from '../../shared/models/interno';

@Component({
  selector: 'app-escala',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './escala.html',
  styleUrls: ['./escala.css']
})
export class Escalas implements OnDestroy {
  escalas: Escala[] = [];
  escalaSelecionada: Escala | null = null;
  internosDisponiveis: Interno[] = [];

  private subAtribuir?: Subscription;

  escalaForm = new FormGroup({
    data: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    atribuicao: new FormControl<'Urgência Dia' | 'Urgência Noite' | 'Residência Noite'>(
      'Urgência Dia',
      {
        nonNullable: true,
        validators: [Validators.required]
      }
    )
  });

  constructor(
    protected escalaService: EscalaService,
    protected internosService: InternosService,
    private router: Router
  ) {
    this.carregarDados();

    if ((this.escalaService as any).atribuirEscala?.subscribe) {
      this.subAtribuir = (this.escalaService as any).atribuirEscala.subscribe(() => {
        this.novaEscala();
      });
    }
  }

  ngOnDestroy(): void {
    this.subAtribuir?.unsubscribe();
  }

  private normalizarAno(ano: unknown): number {
    if (typeof ano === 'number' && !Number.isNaN(ano)) {
      return ano;
    }

    if (typeof ano === 'string') {
      const match = ano.match(/\d+/);
      return match ? Number(match[0]) : NaN;
    }

    return NaN;
  }

  private normalizarInterno(interno: Interno): Interno {
    return {
      ...interno,
      id: Number(interno.id),
      anoInternato: this.normalizarAno(interno.anoInternato)
    };
  }

  carregarDados(): void {
    this.escalas = this.escalaService.getEscalas();
    this.internosDisponiveis = this.internosService
      .getInternos()
      .map(interno => this.normalizarInterno(interno));
  }

  novaEscala(): void {
    this.escalaSelecionada = {
      id: 0,
      data: '',
      internos: [],
      atribuicao: 'Urgência Dia'
    };

    this.escalaForm.reset({
      data: '',
      atribuicao: 'Urgência Dia'
    });

    this.ajustarInternosPorAtribuicao();
  }

  editar(escala: Escala): void {
    this.escalaSelecionada = {
      ...escala,
      internos: escala.internos.map(interno => this.normalizarInterno(interno))
    };

    this.escalaForm.setValue({
      data: escala.data,
      atribuicao: escala.atribuicao
    });

    this.ajustarInternosPorAtribuicao();
  }

  ajustarInternosPorAtribuicao(): void {
    if (!this.escalaSelecionada) return;

    const atribuicaoSelecionada = this.escalaForm.value.atribuicao ?? 'Urgência Dia';
    this.escalaSelecionada.atribuicao = atribuicaoSelecionada;

    if (atribuicaoSelecionada === 'Urgência Dia') {
      this.escalaSelecionada.internos = [
        this.escalaSelecionada.internos[0] ?? null,
        this.escalaSelecionada.internos[1] ?? null,
        this.escalaSelecionada.internos[2] ?? null
      ].filter((i): i is Interno => i !== null);
    } else if (atribuicaoSelecionada === 'Urgência Noite') {
      this.escalaSelecionada.internos = [
        this.escalaSelecionada.internos[0] ?? null,
        this.escalaSelecionada.internos[1] ?? null
      ].filter((i): i is Interno => i !== null);
    } else {
      this.escalaSelecionada.internos = this.escalaSelecionada.internos[0]
        ? [this.escalaSelecionada.internos[0]]
        : [];
    }
  }

  atualizarInterno(index: number, internoId: number | null): void {
    if (!this.escalaSelecionada) return;
    if (internoId === null || internoId === undefined) return;

    const interno = this.internosDisponiveis.find(
      i => Number(i.id) === Number(internoId)
    );

    if (interno) {
      this.escalaSelecionada.internos[index] = this.normalizarInterno(interno);
    }
  }

  private temInternosDuplicadosNaMesmaEscala(escala: Escala): boolean {
    const ids = escala.internos.map(i => Number(i.id));
    return new Set(ids).size !== ids.length;
  }

  guardar(): void {
    if (!this.escalaSelecionada) return;

    if (this.escalaForm.invalid) {
      this.escalaForm.markAllAsTouched();
      return;
    }

    this.escalaSelecionada.data = this.escalaForm.value.data!;
    this.escalaSelecionada.atribuicao = this.escalaForm.value.atribuicao!;

    console.log(
      'internos antes de validar',
      this.escalaSelecionada.internos.map(i => ({
        nome: i?.nome,
        id: i?.id,
        anoInternato: i?.anoInternato
      }))
    );

    if (this.temInternosDuplicadosNaMesmaEscala(this.escalaSelecionada)) {
      alert('Não podes selecionar o mesmo interno duas vezes na mesma atribuição.');
      return;
    }

    const escalaValida = this.escalaService.validarEscala(this.escalaSelecionada);

    if (!escalaValida.valida) {
      alert(escalaValida.mensagem);
      return;
    }

    const internoRepetidoNoMesmoDia =
      this.escalaService.existeInternoRepetidoNoMesmoDia(this.escalaSelecionada);

    if (internoRepetidoNoMesmoDia) {
      alert('O mesmo interno não pode aparecer em mais do que uma atribuição no mesmo dia.');
      return;
    }

    const atribuicaoRepetida =
      this.escalaService.existeAtribuicaoRepetidaNoMesmoDia(this.escalaSelecionada);

    if (atribuicaoRepetida) {
      alert('Essa atribuição já existe nesse dia.');
      return;
    }

    if (this.escalaSelecionada.id === 0) {
      this.escalaService.criarEscala(this.escalaSelecionada);
    } else {
      this.escalaService.editarEscala(this.escalaSelecionada);
    }

    this.escalas = this.escalaService.getEscalas();
    this.escalaSelecionada = null;

    this.escalaForm.reset({
      data: '',
      atribuicao: 'Urgência Dia'
    });
  }

  cancelar(): void {
    this.escalaSelecionada = null;

    this.escalaForm.reset({
      data: '',
      atribuicao: 'Urgência Dia'
    });
  }

  apagar(id: number): void {
    this.escalaService.apagarEscala(id);
    this.escalas = this.escalaService.getEscalas();
  }

  verDetalhe(id: number): void {
    this.router.navigate(['/detalhe', id]);
  }
}