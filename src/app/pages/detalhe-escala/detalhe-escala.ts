import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EscalaService } from '../../shared/services/escalaService';
import { Escala } from '../../shared/models/escala';

@Component({
  selector: 'app-detalhe-escala',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhe-escala.html',
  styleUrl: './detalhe-escala.css'
})
export class DetalheEscala implements OnInit {
  escala: Escala | null = null;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private route: ActivatedRoute,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private router: Router,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private escalaService: EscalaService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (Number.isNaN(id)) {
      this.router.navigate(['/escala']);
      return;
    }

    this.escala = this.escalaService.getEscalaPorId(id) ?? null;

    if (!this.escala) {
      this.router.navigate(['/escala']);
    }
  }

  voltar(): void {
    this.router.navigate(['/escala']);
  }
}