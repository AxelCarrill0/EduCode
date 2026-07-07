import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule, Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-content',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    RouterModule
  ],
  templateUrl: './register-content.component.html',
  styleUrl: './register-content.component.scss'
})

export class RegisterContentComponent {
  nombre: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  registrar() {
    this.errorMessage = '';

    if (!this.nombre.trim() || !this.correo.trim() || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.correo.trim())) {
      this.errorMessage = 'Ingresa un correo electrónico válido';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.acceptTerms) {
      this.errorMessage = 'Debes aceptar los términos y condiciones';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    this.loading = true;
    this.auth.register(this.nombre.trim(), this.correo.trim(), this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/platform/']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Error al crear la cuenta. Intenta de nuevo.';
      }
    });
  }
}
