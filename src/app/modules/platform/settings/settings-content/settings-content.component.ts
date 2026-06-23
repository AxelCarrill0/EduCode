import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";
import { AvatarModule } from "primeng/avatar";
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { SettingsService, AppSettings } from './settings.service';

@Component({
  selector: 'app-settings-content',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule, AvatarModule, InputSwitchModule, FormsModule],
  templateUrl: './settings-content.component.html',
  styleUrl: './settings-content.component.scss'
})
export class SettingsContentComponent {
  settings: AppSettings;

  constructor(private settingsService: SettingsService) {
    this.settings = this.settingsService.get();
  }

  onDarkModeToggle(): void {
    this.settingsService.update({ darkMode: this.settings.darkMode });
    document.body.classList.toggle('dark-mode', this.settings.darkMode);
  }

  onNotificationChange(): void {
    this.settingsService.update({
      emailNotifications: this.settings.emailNotifications,
      reminderNotifications: this.settings.reminderNotifications,
      achievementNotifications: this.settings.achievementNotifications,
    });
  }
}
