import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule, Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';

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
    DividerModule,
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

  constructor(private router: Router) {}

  registrar() {
    if (this.nombre === '' || this.correo === '' || this.password === '' || this.confirmPassword === '') {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!this.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    console.log(this.nombre);
    console.log(this.correo);
    console.log(this.password);

    alert('Usuario registrado correctamente');
    this.router.navigate(['/login']);
  }
}
