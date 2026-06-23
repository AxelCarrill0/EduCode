import { Injectable } from '@angular/core';

export interface AppSettings {
  darkMode: boolean;
  language: string;
  emailNotifications: boolean;
  reminderNotifications: boolean;
  achievementNotifications: boolean;
}

const STORAGE_KEY = 'edocode_settings';

function defaultSettings(): AppSettings {
  return {
    darkMode: false,
    language: 'es',
    emailNotifications: true,
    reminderNotifications: true,
    achievementNotifications: true,
  };
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private settings: AppSettings;

  constructor() { this.settings = this.load(); }

  private load(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultSettings(), ...JSON.parse(raw) };
    } catch {}
    return defaultSettings();
  }

  private save(): void {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings)); } catch {}
  }

  get(): AppSettings { return this.settings; }

  update(partial: Partial<AppSettings>): void {
    Object.assign(this.settings, partial);
    this.save();
  }
}
