import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Posts } from './posts/posts';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'posts', component: Posts },
  { path: '**', redirectTo: 'register' }
];
