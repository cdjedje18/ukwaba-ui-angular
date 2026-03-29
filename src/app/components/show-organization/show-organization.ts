import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-show-organization',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './show-organization.html',
  styleUrl: './show-organization.css',
})
export class ShowOrganizationComponent implements OnInit {
  organization = signal<any>(null);
  loading = signal(true);
  error = signal('');
  organizationId: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.organizationId = this.route.snapshot.paramMap.get('id');
    if (this.organizationId) {
      this.loadOrganization();
    } else {
      this.error.set('Organization ID not found');
      this.loading.set(false);
    }
  }

  loadOrganization() {
    this.loading.set(true);
    this.error.set('');

    this.apiService.get(`/organizations/${this.organizationId}?fields=*`).subscribe({
      next: (data: any) => {
        this.organization.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load organization:', error);
        this.error.set('Failed to load organization details. Please try again.');
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  deleteOrganization() {
    if (confirm('Are you sure you want to delete this organization?')) {
      this.loading.set(true);
      this.apiService.delete(`/organizations/${this.organizationId}`).subscribe({
        next: () => {
          console.log('Organization deleted successfully');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Failed to delete organization:', error);
          this.error.set('Failed to delete organization.');
          this.loading.set(false);
        }
      });
    }
  }
}
