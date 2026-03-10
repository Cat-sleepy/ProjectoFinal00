import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InternosService } from '../shared/services/internosService';
import { Interno } from '../shared/models/interno';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ModalComponent implements OnChanges {
  @Output() fecharModal = new EventEmitter<void>();
  @Input() internoParaEditar: Interno | null = null;

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

  constructor(private internosService: InternosService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['internoParaEditar']) {
      if (this.internoParaEditar) {
        this.internoForm.setValue({
          nome: this.internoParaEditar.nome,
          anoInternato: Number(this.internoParaEditar.anoInternato),
          estado: this.internoParaEditar.estado
        });
      } else {
        this.limparFormulario();
      }
    }
  }

  @HostListener('document:keydown.escape')
  fecharComEsc(): void {
    this.fechar();
  }

  get estaEmModoEdicao(): boolean {
    return !!this.internoParaEditar;
  }

  guardar(): void {
    if (this.internoForm.invalid) {
      this.internoForm.markAllAsTouched();
      return;
    }

    const internoParaGuardar: Interno = {
      id: this.internoParaEditar ? this.internoParaEditar.id : 0,
      nome: this.internoForm.controls.nome.value,
      anoInternato: Number(this.internoForm.controls.anoInternato.value),
      estado: this.internoForm.controls.estado.value
    };

    this.internosService.guardarInterno(internoParaGuardar);
    this.fechar();
  }

  fechar(): void {
    this.limparFormulario();
    this.fecharModal.emit();
  }

  private limparFormulario(): void {
    this.internoForm.reset({
      nome: '',
      anoInternato: 1,
      estado: ''
    });
  }
}