import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
  AuthChangeEvent,
  Session
} from '@supabase/supabase-js';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient = createClient(
    environment.supabase.url,
    environment.supabase.key
  );

  onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    return { session: data.session, error };
  }

  async getUserById(id: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    return { profile: data, error };
  }

  async signUpWithEmail(
    email: string,
    password: string,
    metadata: { name: string }
  ) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    return { user: data.user, session: data.session, error };
  }

  async signInWithEmail(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    return { session: data.session, user: data.user, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }
}