import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button'; // para boton de registrarse
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';// para contrasseña

@Component({
  selector: 'app-login-content',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    RouterModule
  ],
  templateUrl: './login-content.component.html',
  styleUrl: './login-content.component.scss'
})
export class LoginContentComponent {
  //variables para guardar datos del formulario de registro
  correo: string = '';
  password: string = '';

  //metodo para registrar usuario  y verificar de que todos los campos esten llenos
  iniciarSesion(){

  if(
    this.correo === '' ||
    this.password === ''
  ){

    alert('Todos los campos son obligatorios');
    return;

  }

  // mostrar datos
  console.log(this.correo);
  console.log(this.password);

  alert('Usuario logueado correctamente');

}
  

}
