import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { LoginCredentials, RegisterRequest, User } from '../models/auth.models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabaseService = inject(SupabaseService);
  private platformId = inject(PLATFORM_ID);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    this.initializeAuth();
    void this.restoreSession();
  }

  private getStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage;
    }
    return null;
  }

  private initializeAuth(): void {
    this.supabaseService.onAuthStateChange((event, session) => {
      if (session?.user) {
        void this.handleUser(session.user);
      } else {
        this.currentUserSubject.next(null);
        this.getStorage()?.removeItem('user');
      }
    });
  }

  private async restoreSession(): Promise<void> {
    const { session } = await this.supabaseService.getSession();
    if (session?.user) {
      await this.handleUser(session.user);
    }
  }

  private async handleUser(authUser: SupabaseUser): Promise<void> {
    try {
      const { profile } = await this.supabaseService.getUserById(authUser.id);

      const userData: User = {
        id: authUser.id,
        email: authUser.email || '',
        name: profile?.name || authUser.user_metadata?.['name'] || '',
        createdAt: new Date(authUser.created_at || Date.now())
      };

      this.currentUserSubject.next(userData);
      this.getStorage()?.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao carregar utilizador:', error);

      const fallbackUser: User = {
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.['name'] || '',
        createdAt: new Date(authUser.created_at || Date.now())
      };

      this.currentUserSubject.next(fallbackUser);
      this.getStorage()?.setItem('user', JSON.stringify(fallbackUser));
    }
  }

  async register(data: RegisterRequest): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await this.supabaseService.signUpWithEmail(
        data.email,
        data.password,
        { name: data.name }
      );

      if (error) {
        return { success: false, message: error.message };
      }

      return {
        success: true,
        message: 'Conta criada! Verifica o email.'
      };
    } catch (error) {
      console.error('Erro no registo:', error);
      return { success: false, message: 'Erro ao criar conta.' };
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await this.supabaseService.signInWithEmail(
        credentials.email,
        credentials.password
      );

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Login realizado com sucesso!' };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, message: 'Erro ao fazer login.' };
    }
  }

  async logout(): Promise<void> {
    await this.supabaseService.signOut();
    this.currentUserSubject.next(null);
    this.getStorage()?.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  async hasValidSession(): Promise<boolean> {
    const { session } = await this.supabaseService.getSession();
    return !!session?.user;
  }
}