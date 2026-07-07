import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  bio?: string;
  created_at?: string;
}

export interface AuthResponse {
  message: string;
  session?: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
  } | null;
  user: AuthUser | null;
  needsEmailConfirmation?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'edocode_access_token';
  private readonly userKey = 'edocode_user';
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, { name, email, password })
      .pipe(tap((response) => this.saveSession(response)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(tap((response) => this.saveSession(response)));
  }

  me(): Observable<{ user: AuthUser }> {
    return this.http.get<{ user: AuthUser }>(`${this.apiUrl}/auth/me`, {
      headers: this.authHeaders(),
    }).pipe(tap(({ user }) => this.saveUser(user)));
  }

  updateProfile(name: string, bio: string): Observable<{ user: AuthUser }> {
    return this.http.put<{ user: AuthUser }>(`${this.apiUrl}/auth/profile`, { name, bio }, {
      headers: this.authHeaders(),
    }).pipe(tap(({ user }) => this.saveUser(user)));
  }

  changePassword(newPassword: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/auth/change-password`, { newPassword }, {
      headers: this.authHeaders(),
    });
  }

  deleteAccount(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/auth/account`, {
      headers: this.authHeaders(),
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  isAuthenticated(): boolean {
    return this.getToken().length > 0;
  }

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) as AuthUser : null;
  }

  authHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  private saveSession(response: AuthResponse): void {
    if (response.session?.access_token) {
      localStorage.setItem(this.tokenKey, response.session.access_token);
    }

    if (response.user) {
      this.saveUser(response.user);
    }
  }

  private saveUser(user: AuthUser): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}
