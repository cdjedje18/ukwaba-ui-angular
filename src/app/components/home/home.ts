import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterLink,],
  templateUrl: './home.html',
  styleUrl: './home.css',
})


export class HomeComponent implements OnInit {
  organizations = signal<any[]>([]);
  loading = signal(false);

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.loading.set(true);
    this.apiService.get('/organizations').subscribe({
      next: (data: any) => {
        this.organizations.set(data.organizations || []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load organizations:', error);
        this.loading.set(false);
      }
    });
  }
}
