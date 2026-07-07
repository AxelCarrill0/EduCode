import { Injectable } from '@angular/core';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  icon: string;
  color: string;
  read: boolean;
  createdAt: string;
  type: 'achievement' | 'lesson' | 'reminder' | 'system';
}

const STORAGE_KEY = 'edocode_notifications';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications: AppNotification[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.notifications = JSON.parse(raw);
    } catch {
      this.notifications = [];
    }
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notifications));
    } catch {}
  }

  getAll(): AppNotification[] {
    return [...this.notifications].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getUnread(): AppNotification[] {
    return this.notifications.filter(n => !n.read);
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  add(notification: Omit<AppNotification, 'id' | 'createdAt' | 'read'>): void {
    const newNotif: AppNotification = {
      ...notification,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.notifications.push(newNotif);
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(-50);
    }
    this.save();
  }

  markAsRead(id: string): void {
    const n = this.notifications.find(n => n.id === id);
    if (n) { n.read = true; this.save(); }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.save();
  }

  clear(): void {
    this.notifications = [];
    this.save();
  }
}
