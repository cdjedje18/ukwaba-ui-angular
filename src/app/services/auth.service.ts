import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthUser {
  userId: number;
  username: string;
  displayName: string;
  role: string;
  tokens: {
    accessToken: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUser = signal<AuthUser | null>(this.loadFromStorage());

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => this.currentUser() !== null);
  readonly role = computed(() => this.currentUser()?.role ?? null);

  constructor(private readonly router: Router) { }

  login(response: AuthUser): void {
    sessionStorage.setItem('auth_user', JSON.stringify(response));
    this.currentUser.set(response);
    this.router.navigate(['/home']);
  }

  logout(): void {
    sessionStorage.removeItem('auth_user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    // console.log('Getting token for user:', this.currentUser());
    return this.currentUser()?.tokens?.accessToken ?? null;
  }

  private loadFromStorage(): AuthUser | null {
    const stored = sessionStorage.getItem('auth_user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
}
