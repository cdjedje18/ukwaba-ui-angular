import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { HomeComponent } from './components/home/home';
import { CreateOrganizationComponent } from './components/create-organization/create-organization';
import { ShowOrganizationComponent } from './components/show-organization/show-organization';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create-organization', component: CreateOrganizationComponent },
  { path: 'organizations/:id', component: ShowOrganizationComponent },
];

