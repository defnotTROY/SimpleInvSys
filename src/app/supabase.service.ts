import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async signUp(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }

  async signIn(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  async signOut(): Promise<any> {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  async resetPasswordForEmail(email: string): Promise<any> {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:4200/update-password',
    });
    return { data, error };
  }

  async updatePassword(password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.updateUser({
      password: password
    });
    return { data, error };
  }

  async getSession() {
    return await this.supabase.auth.getSession();
  }

  get authChanges() {
    return this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth Event:', event, session);
    });
  }

  // Inventory Methods
  async getInventory() {
    return await this.supabase
      .from('inventory')
      .select('*')
      .order('id', { ascending: true });
  }

  async addItem(item: { name: string; quantity: number; price: number }) {
    return await this.supabase
      .from('inventory')
      .insert([item])
      .select();
  }

  async updateItem(id: number, item: { name: string; quantity: number; price: number }) {
    return await this.supabase
      .from('inventory')
      .update(item)
      .eq('id', id)
      .select();
  }

  async deleteItem(id: number) {
    return await this.supabase
      .from('inventory')
      .delete()
      .eq('id', id);
  }
}
