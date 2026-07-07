import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";
import { AvatarModule } from "primeng/avatar";
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { SettingsService, AppSettings } from './settings.service';
import { AuthService, AuthUser } from '../../../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings-content',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule, AvatarModule, InputSwitchModule, FormsModule],
  templateUrl: './settings-content.component.html',
  styleUrl: './settings-content.component.scss'
})
export class SettingsContentComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  settings: AppSettings;
  user: AuthUser | null = null;

  get userInitial(): string {
    return this.user?.name?.charAt(0)?.toUpperCase() || 'U';
  }

  get memberSince(): string {
    if (!this.user?.created_at) return 'Desconocido';
    const date = new Date(this.user.created_at);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  constructor(
    private settingsService: SettingsService,
    private auth: AuthService
  ) {
    this.settings = this.settingsService.get();
    this.user = this.auth.getUser();
  }

  ngOnInit(): void {
    this.settingsService.fetch().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.settings = res.settings;
    });
    this.auth.me().pipe(takeUntil(this.destroy$)).subscribe(({ user }) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDarkModeToggle(): void {
    const current = this.settings.darkMode;
    this.settingsService.update({ darkMode: current }).subscribe({
      error: () => {
        this.settings.darkMode = !current;
      }
    });
  }

  onNotificationChange(): void {
    this.settingsService.update({
      emailNotifications: this.settings.emailNotifications,
      reminderNotifications: this.settings.reminderNotifications,
      achievementNotifications: this.settings.achievementNotifications,
    }).subscribe();
  }
}
