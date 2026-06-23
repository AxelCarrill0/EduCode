import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SettingsService } from '../settings-content/settings.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  name = 'Usuario';
  email = 'usuario@educloud.com';
  bio = 'Aprendiendo programación con EduCode';

  constructor(private settings: SettingsService) {}

  save(): void {
    alert('Perfil actualizado (simulado)');
  }
}
