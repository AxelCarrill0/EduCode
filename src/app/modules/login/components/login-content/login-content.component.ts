import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login-content',
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
  templateUrl: './login-content.component.html',
  styleUrl: './login-content.component.scss'
})
export class LoginContentComponent {
  correo: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    this.errorMessage = '';

    if (this.correo.trim() === '' || this.password === '') {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    console.log('Inicio de sesión para:', this.correo);

    this.router.navigate(['/platform/']);
  }
}
