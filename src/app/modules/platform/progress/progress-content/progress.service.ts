import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { ApiService } from '../../../../core/services/api.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MODULE_LESSON_COUNTS, MODULE_NAMES, XP_PER_LESSON_COMPLETED, XP_PER_MODULE_COMPLETED, XP_PER_ACHIEVEMENT } from '../../../../core/constants/app.constants';

export interface LessonState {
  lessonIndex: number;
  completed: boolean;
}

export interface ModuleState {
  moduleId: number;
  moduleName: string;
  lessons: LessonState[];
  started: boolean;
  completed: boolean;
}

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface AchievementState extends AchievementDef {
  earned: boolean;
  earnedAt?: Date;
}

export interface ProgressData {
  modules: ModuleState[];
  xp: number;
  streak: number;
  lastActivityDate: string;
}

interface ProgressResponse {
  stats?: {
    xp?: number;
    streak?: number;
  };
  modules?: ProgressModuleDTO[];
}

interface ProgressModuleDTO {
  completedModule?: boolean;
  completed?: number;
}

interface CompleteLessonResponse {
  stats?: {
    streak?: number;
  };
}

const STORAGE_KEY = 'edocode_progress';

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  { id: 'first-lesson', name: 'Primera lección', description: 'Completaste tu primera lección', icon: 'pi pi-star-fill', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.12)' },
  { id: 'streak-5', name: 'Racha de 5 días', description: '5 días consecutivos aprendiendo', icon: 'pi pi-bolt', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.12)' },
  { id: 'exercises-5', name: '5 ejercicios', description: 'Completaste 5 lecciones prácticas', icon: 'pi pi-check-circle', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.12)' },
  { id: 'explorer', name: 'Explorador', description: 'Iniciaste todos los módulos', icon: 'pi pi-compass', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.12)' },
  { id: 'completador', name: 'Completador', description: 'Completaste tu primer módulo', icon: 'pi pi-trophy', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.12)' },
  { id: 'exercises-10', name: '10 ejercicios', description: 'Completaste 10 lecciones prácticas', icon: 'pi pi-code', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.12)' },
];

function defaultProgress(): ProgressData {
  return {
    modules: MODULE_NAMES.map((name, i) => ({
      moduleId: i,
      moduleName: name,
      lessons: Array.from({ length: MODULE_LESSON_COUNTS[i] }, (_, j) => ({
        lessonIndex: j, completed: false
      })),
      started: false,
      completed: false
    })),
    xp: 0,
    streak: 0,
    lastActivityDate: ''
  };
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private data: ProgressData;
  private achievements: AchievementState[];
  private destroy$ = new Subject<void>();

  constructor(
    private api: ApiService,
    private notifications: NotificationService
  ) {
    const saved = this.loadLocal();
    this.data = saved.data;
    this.achievements = saved.achievements;
  }

  private loadLocal(): { data: ProgressData; achievements: AchievementState[] } {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          data: parsed.data || defaultProgress(),
          achievements: parsed.achievements || ACHIEVEMENT_DEFS.map(a => ({ ...a, earned: false }))
        };
      }
    } catch {}
    return { data: defaultProgress(), achievements: ACHIEVEMENT_DEFS.map(a => ({ ...a, earned: false })) };
  }

  private saveLocal(): void {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: this.data, achievements: this.achievements })); } catch {}
  }

  fetchFromApi(): Observable<ProgressResponse | null> {
    return this.api.get<ProgressResponse>('/progress').pipe(
      tap((res) => {
        if (res?.stats) {
          this.data.xp = Math.max(res.stats.xp ?? 0, this.data.xp);
          if ((res.stats.streak ?? 0) > 0) this.data.streak = res.stats.streak ?? 0;

          if (res.modules) {
            res.modules.forEach((m, i: number) => {
              if (this.data.modules[i]) {
                this.data.modules[i].completed = m.completedModule ?? false;
                this.data.modules[i].started = (m.completed ?? 0) > 0;
                this.data.modules[i].lessons.forEach((lesson, j) => {
                  lesson.completed = j < (m.completed ?? 0);
                });
              }
            });
          }
          this.evaluateAchievements();
          this.saveLocal();
        }
      }),
      catchError(() => of(null))
    );
  }

  getModules(): ModuleState[] { return this.data.modules; }

  getAchievements(): AchievementState[] { return this.achievements; }

  getXp(): number { return this.data.xp; }

  getStreak(): number { return this.data.streak; }

  getTotalCompletedLessons(): number {
    return this.data.modules.reduce((sum, m) => sum + m.lessons.filter(l => l.completed).length, 0);
  }

  getTotalLessons(): number {
    return this.data.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  }

  getModulesCompleted(): number {
    return this.data.modules.filter(m => m.completed).length;
  }

  getModulesStarted(): number {
    return this.data.modules.filter(m => m.started).length;
  }

  getInProgressLessons(): number {
    return this.data.modules.reduce((sum, m) => {
      if (m.completed) return sum;
      const completed = m.lessons.filter(l => l.completed).length;
      return completed > 0 ? sum + completed : sum;
    }, 0);
  }

  getPendingLessons(): number {
    return this.data.modules.reduce((sum, m) => {
      if (m.completed) return sum;
      return sum + m.lessons.filter(l => !l.completed).length;
    }, 0);
  }

  getModuleProgress(moduleId: number): { completed: number; total: number; pct: number; completedModule: boolean } {
    const mod = this.data.modules[moduleId];
    if (!mod) return { completed: 0, total: 0, pct: 0, completedModule: false };
    const completed = mod.lessons.filter(l => l.completed).length;
    return {
      completed,
      total: mod.lessons.length,
      pct: mod.lessons.length > 0 ? Math.round((completed / mod.lessons.length) * 100) : 0,
      completedModule: completed === mod.lessons.length && mod.lessons.length > 0,
    };
  }

  completeLesson(moduleId: number, lessonIndex: number): AchievementState[] {
    const mod = this.data.modules[moduleId];
    if (!mod) return [];

    mod.started = true;
    const lesson = mod.lessons.find(l => l.lessonIndex === lessonIndex);
    if (lesson?.completed) return [];

    if (lesson) lesson.completed = true;
    this.data.xp += XP_PER_LESSON_COMPLETED;

    this.notifications.add({
      title: 'Lección completada',
      message: `Completaste "${mod.moduleName}" - Lección ${lessonIndex + 1}`,
      icon: 'pi pi-check-circle',
      color: '#10b981',
      type: 'lesson',
    });

    this.updateStreak();
    this.checkModuleCompletion(moduleId);
    const newAchievements = this.evaluateAchievements();
    this.saveLocal();

    this.api.post<CompleteLessonResponse>('/progress/lessons/complete', {
      moduleId: moduleId + 1,
      lessonId: this.getLessonId(moduleId, lessonIndex),
    }).pipe(
      takeUntil(this.destroy$),
      tap((res) => {
        if (res?.stats) {
          this.data.streak = res.stats.streak ?? this.data.streak;
        }
      }),
      catchError((err) => {
        console.error('Error al guardar progreso en la BD:', err);
        return of(null);
      })
    ).subscribe();

    return newAchievements;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getLessonId(moduleId: number, lessonIndex: number): number {
    let id = 0;
    for (let m = 0; m < moduleId; m++) {
      id += MODULE_LESSON_COUNTS[m];
    }
    return id + lessonIndex + 1;
  }

  private updateStreak(): void {
    const today = new Date().toISOString().split('T')[0];
    if (this.data.lastActivityDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (this.data.lastActivityDate === yesterday) {
      this.data.streak++;
    } else if (this.data.lastActivityDate !== today) {
      this.data.streak = 1;
    }
    this.data.lastActivityDate = today;
  }

  private checkModuleCompletion(moduleId: number): void {
    const mod = this.data.modules[moduleId];
    if (!mod || mod.completed) return;

    const allDone = mod.lessons.every(l => l.completed);
    if (allDone) {
      mod.completed = true;
      this.data.xp += XP_PER_MODULE_COMPLETED;
      this.notifications.add({
        title: 'Módulo completado',
        message: `¡Felicidades! Completaste "${mod.moduleName}"`,
        icon: 'pi pi-trophy',
        color: '#f59e0b',
        type: 'lesson',
      });
    }
  }

  private evaluateAchievements(): AchievementState[] {
    const totalLessons = this.getTotalCompletedLessons();
    const modulesStarted = this.getModulesStarted();
    const modulesCompleted = this.getModulesCompleted();
    const streak = this.data.streak;
    const newOnes: AchievementState[] = [];

    const checks: Record<string, boolean> = {
      'first-lesson': totalLessons >= 1,
      'streak-5': streak >= 5,
      'exercises-5': totalLessons >= 5,
      'explorer': modulesStarted >= this.data.modules.length,
      'completador': modulesCompleted >= 1,
      'exercises-10': totalLessons >= 10,
    };

    for (const ach of this.achievements) {
      if (!ach.earned && checks[ach.id]) {
        ach.earned = true;
        ach.earnedAt = new Date();
        this.data.xp += XP_PER_ACHIEVEMENT;
        newOnes.push(ach);
        this.notifications.add({
          title: 'Logro desbloqueado',
          message: `Has conseguido: ${ach.name}`,
          icon: ach.icon,
          color: ach.color,
          type: 'achievement',
        });
      }
    }

    return newOnes;
  }

  resetAll(): void {
    this.data = defaultProgress();
    this.achievements = ACHIEVEMENT_DEFS.map(a => ({ ...a, earned: false }));
    this.saveLocal();
  }
}
