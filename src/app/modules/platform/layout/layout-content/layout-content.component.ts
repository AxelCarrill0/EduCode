import { Component, signal, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../../../core/services/auth.service';
import { ProgressService } from '../../progress/progress-content/progress.service';
import { NotificationService, AppNotification } from '../../../../core/services/notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-layout-content',
  standalone: true,
  imports: [CommonModule, RouterModule, AvatarModule, TagModule],
  templateUrl: './layout-content.component.html',
  styleUrl: './layout-content.component.scss'
})
export class LayoutContentComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  mobileMenuOpen = signal(false);
  notifOpen = signal(false);

  constructor(
    public auth: AuthService,
    public notifications: NotificationService,
    private router: Router,
    private progress: ProgressService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.progress.fetchFromApi().pipe(takeUntil(this.destroy$)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get userName(): string {
    return this.auth.getUser()?.name || 'Usuario';
  }

  get userInitial(): string {
    return this.userName.charAt(0).toUpperCase();
  }

  get userLevel(): { name: string; severity: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' } {
    const xp = this.progress.getXp();
    if (xp >= 1000) return { name: 'Experto', severity: 'danger' };
    if (xp >= 500) return { name: 'Avanzado', severity: 'warning' };
    if (xp >= 200) return { name: 'Intermedio', severity: 'info' };
    return { name: 'Principiante', severity: 'success' };
  }

  get unreadCount(): number {
    return this.notifications.getUnreadCount();
  }

  get notifList(): AppNotification[] {
    return this.notifications.getAll().slice(0, 10);
  }

  logout(): void {
    this.auth.logout();
    this.progress.resetAll();
    this.router.navigate(['/login']);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => {
      const next = !v;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  toggleNotifPanel(): void {
    this.notifOpen.update(v => !v);
  }

  closeNotifPanel(): void {
    this.notifOpen.set(false);
  }

  markAsRead(id: string): void {
    this.notifications.markAsRead(id);
  }

  markAllRead(): void {
    this.notifications.markAllAsRead();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMobileMenu();
    this.closeNotifPanel();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent): void {
    if (this.notifOpen()) {
      const target = event.target as HTMLElement;
      if (!target.closest('.notif-btn-wrapper')) {
        this.closeNotifPanel();
      }
    }
  }
}