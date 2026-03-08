import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InternosService } from '../shared/services/internosService';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  //protected readonly titulo: string = 'CareGrid';
  logo: string = 'logo.png';
  titulo: string = "";

  constructor(private internosService: InternosService) {}

novoInterno() {
  this.internosService.triggerNovoInterno();
}

  

  clicar() {
    alert('Botão clicado');
  }

}
