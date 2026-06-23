import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  error = '';
  success = false;

  change(): void {
    this.error = '';
    this.success = false;

    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }
    if (this.newPassword.length < 6) {
      this.error = 'La nueva contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.success = true;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
