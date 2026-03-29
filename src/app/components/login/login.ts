import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { AuthService, AuthUser } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class LoginComponent {
  email = '';
  password = '';
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly backendStatus = signal<string | null>(null);

  constructor(
    private readonly api: ApiService,
    private readonly auth: AuthService
  ) {
    this.api.get<{ status: string; configured: boolean }>('/organizations/health').subscribe({
      next: (res) => this.backendStatus.set(res.configured ? 'ok' : 'pending'),
      error: () => this.backendStatus.set('error'),
    });
  }

  onLogin(): void {
    if (!this.email || !this.password) return;

    this.loading.set(true);
    this.error.set(null);

    this.api.post<AuthUser>('/users/login', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.auth.login(response);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Invalid email or password.');
        this.loading.set(false);
      },
    });
  }
}
