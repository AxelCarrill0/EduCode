import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; 
import { ButtonModule } from 'primeng/button'; // para boton de registrarse
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';// para contrasseña

@Component({
  selector: 'app-register-content',
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
  templateUrl: './register-content.component.html',
  styleUrl: './register-content.component.scss'
})

export class RegisterContentComponent {
  //variables para guardar datos del formulario de registro
  nombre: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';

  //metodo para registrar usuario  y verificar de que todos los campos esten llenos
  registrar(){

  if(
    this.nombre === '' ||
    this.correo === '' ||
    this.password === '' ||
    this.confirmPassword === ''
  ){

    alert('Todos los campos son obligatorios');
    return;

  }

  // verificar si las contraseñas coinciden
    if(this.password !== this.confirmPassword){

      alert('Las contraseñas no coinciden');
      return;

    }

    // mostrar datos
    console.log(this.nombre);
    console.log(this.correo);
    console.log(this.password);

    alert('Usuario registrado correctamente');

}
  
}
