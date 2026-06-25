import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';
import { RegisterUser } from '../models';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private api = inject(Api);

  model: RegisterUser = { username: '', email: '', password: '' };
  loading = signal(false);
  message = signal<{ text: string; ok: boolean } | null>(null);

  submit() {
    this.loading.set(true);
    this.message.set(null);

    this.api.registerUser(this.model).subscribe({
      next: () => {
        this.loading.set(false);
        this.message.set({ text: 'User registered successfully!', ok: true });
        this.model = { username: '', email: '', password: '' };
      },
      error: (err) => {
        this.loading.set(false);
        const text = err?.error?.message ?? 'Something went wrong';
        this.message.set({ text, ok: false });
      }
    });
  }
}
