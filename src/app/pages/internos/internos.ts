import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InternosService } from '../../shared/services/internosService';
import { Interno } from '../../shared/models/interno';

@Component({
  selector: 'app-internos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './internos.html',
  styleUrl: './internos.css'
})
export class Internos {
  internos: Interno[] = [];
  internoSelecionado: Interno | null = null;

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
    this.internos = this.internosService.getInternos();

    this.internosService.abrirNovoInterno.subscribe(() => {
      this.novoInterno();
    });
  }

  novoInterno() {
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

  editar(interno: Interno) {
    this.internoSelecionado = { ...interno };

    this.internoForm.setValue({
      nome: interno.nome,
      anoInternato: interno.anoInternato,
      estado: interno.estado
    });
  }

  guardar() {
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

    this.internos = this.internosService.getInternos();
    this.internoSelecionado = null;

    this.internoForm.reset({
      nome: '',
      anoInternato: 1,
      estado: ''
    });
  }

  cancelar() {
    this.internoSelecionado = null;

    this.internoForm.reset({
      nome: '',
      anoInternato: 1,
      estado: ''
    });
  }

  apagar(id: number) {
    this.internosService.apagarInterno(id);
    this.internos = this.internosService.getInternos();
  }
}
