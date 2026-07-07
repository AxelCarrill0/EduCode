import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService, AuthUser } from '../../../../core/services/auth.service';
import { SUCCESS_MESSAGE_DURATION_MS } from '../../../../core/constants/app.constants';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  private timeoutIds: ReturnType<typeof setTimeout>[] = [];
  name = '';
  email = '';
  bio = '';
  error = '';
  success = '';
  saving = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (user) {
      this.name = user.name;
      this.email = user.email;
      this.bio = user.bio || 'Aprendiendo programación con EduCode';
    }
  }

  ngOnDestroy(): void {
    this.timeoutIds.forEach(id => clearTimeout(id));
  }

  save(): void {
    this.error = '';
    this.success = '';
    if (!this.name.trim()) {
      this.error = 'El nombre es obligatorio.';
      return;
    }

    this.saving = true;
    this.auth.updateProfile(this.name.trim(), this.bio).subscribe({
      next: () => {
        this.saving = false;
        this.success = 'Perfil actualizado correctamente.';
        const id = setTimeout(() => this.success = '', SUCCESS_MESSAGE_DURATION_MS);
        this.timeoutIds.push(id);
      },
      error: (err) => {
        this.saving = false;
        this.error = err.error?.message || 'Error al guardar el perfil.';
      }
    });
  }
}
