import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressService } from '../../progress/progress-content/progress.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ButtonModule],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss'
})
export class DeleteAccountComponent {
  confirmText = '';
  step: 'confirm' | 'done' = 'confirm';
  error = '';
  deleting = false;

  constructor(
    private progress: ProgressService,
    private auth: AuthService,
    private router: Router
  ) {}

  delete(): void {
    this.error = '';
    this.deleting = true;

    this.auth.deleteAccount().subscribe({
      next: () => {
        this.progress.resetAll();
        localStorage.removeItem('edocode_settings');
        this.deleting = false;
        this.step = 'done';
      },
      error: (err) => {
        this.deleting = false;
        this.error = err.error?.message || 'Error al eliminar la cuenta.';
      }
    });
  }
}
