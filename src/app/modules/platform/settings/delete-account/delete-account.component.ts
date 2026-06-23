import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressService } from '../../progress/progress-content/progress.service';
import { SettingsService } from '../settings-content/settings.service';

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

  constructor(
    private progress: ProgressService,
    private settings: SettingsService
  ) {}

  delete(): void {
    this.progress.resetAll();
    this.settings['settings'] = undefined as any;
    localStorage.removeItem('edocode_settings');
    this.step = 'done';
  }
}
