import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { AuthService } from './pages/features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Sidebar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authService = inject(AuthService);
  isLoggedIn = false;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: unknown) => {
      this.isLoggedIn = !!user;
    });
  }
}

let ar=123;