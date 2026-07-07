import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from '../../../../core/services/api.service';

export interface AppSettings {
  darkMode: boolean;
  language: string;
  emailNotifications: boolean;
  reminderNotifications: boolean;
  achievementNotifications: boolean;
}

interface SettingsResponse {
  settings: SettingsDTO;
}

interface SettingsDTO {
  dark_mode?: boolean;
  darkMode?: boolean;
  language?: string;
  email_notifications?: boolean;
  emailNotifications?: boolean;
  reminder_notifications?: boolean;
  reminderNotifications?: boolean;
  achievement_notifications?: boolean;
  achievementNotifications?: boolean;
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
  private cached: AppSettings;

  constructor(private api: ApiService) {
    this.cached = this.loadLocal();
    this.applyTheme();
  }

  private loadLocal(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultSettings(), ...JSON.parse(raw) };
    } catch {}
    return defaultSettings();
  }

  private saveLocal(): void {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cached)); } catch {}
  }

  private applyTheme(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark-mode', this.cached.darkMode);
    }
  }

  get(): AppSettings {
    return this.cached;
  }

  fetch(): Observable<{ settings: AppSettings }> {
    return this.api.get<SettingsResponse>('/settings').pipe(
      tap((res) => {
        this.cached = this.toCamelCase(res.settings);
        this.saveLocal();
        this.applyTheme();
      }),
      map(() => ({ settings: this.cached })),
      catchError(() => {
        this.cached = this.loadLocal();
        this.applyTheme();
        return of({ settings: this.cached });
      })
    );
  }

  private version = 0;

  update(partial: Partial<AppSettings>): Observable<{ settings: AppSettings }> {
    const reqVersion = ++this.version;
    Object.assign(this.cached, partial);
    this.saveLocal();
    this.applyTheme();

    return this.api.put<SettingsResponse>('/settings', this.cached).pipe(
      tap((res) => {
        if (reqVersion === this.version) {
          this.cached = this.toCamelCase(res.settings);
          this.saveLocal();
          this.applyTheme();
        }
      }),
      map(() => ({ settings: this.cached })),
      catchError(() => of({ settings: this.cached }))
    );
  }

  private toCamelCase(s: SettingsDTO): AppSettings {
    return {
      darkMode: s.dark_mode ?? s.darkMode ?? false,
      language: s.language ?? 'es',
      emailNotifications: s.email_notifications ?? s.emailNotifications ?? true,
      reminderNotifications: s.reminder_notifications ?? s.reminderNotifications ?? true,
      achievementNotifications: s.achievement_notifications ?? s.achievementNotifications ?? true,
    };
  }
}
