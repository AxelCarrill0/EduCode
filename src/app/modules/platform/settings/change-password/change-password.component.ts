import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  newPassword = '';
  confirmPassword = '';
  error = '';
  success = false;
  saving = false;

  constructor(private auth: AuthService) {}

  change(): void {
    this.error = '';
    this.success = false;

    if (!this.newPassword || !this.confirmPassword) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }
    if (this.newPassword.length < 8) {
      this.error = 'La nueva contraseña debe tener al menos 8 caracteres.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.saving = true;
    this.auth.changePassword(this.newPassword).subscribe({
      next: () => {
        this.saving = false;
        this.success = true;
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Error al cambiar la contraseña.';
      }
    });
  }
}
