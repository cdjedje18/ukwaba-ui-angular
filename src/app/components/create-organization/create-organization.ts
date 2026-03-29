import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-create-organization',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './create-organization.html',
  styleUrl: './create-organization.css',
})
export class CreateOrganizationComponent {
  name = signal('');
  description = signal('');
  loading = signal(false);
  error = signal('');

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  createOrganization() {
    if (!this.name().trim()) {
      this.error.set('Organization name is required');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const payload = { 
      name: this.name(),
      description: this.description() 
    };

    this.apiService.post('/organizations', payload).subscribe({
      next: (response) => {
        console.log('Organization created:', response);
        this.loading.set(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Failed to create organization:', error);
        this.error.set('Failed to create organization. Please try again.');
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
