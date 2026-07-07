import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TimelineModule } from 'primeng/timeline';
import { ChartModule } from 'primeng/chart';
import { ProgressService } from '../../progress/progress-content/progress.service';
import { MODULE_ICONS, MODULE_COLORS } from '../../../../core/constants/app.constants';
import { AuthService } from '../../../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ProgressBarModule,
    RouterModule,
    ButtonModule,
    PanelModule,
    TimelineModule,
    ChartModule
  ],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})
export class DashboardContentComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  userStats = {
    name: 'Usuario',
    levelProgress: 0,
    streak: 0,
    modulesCompleted: 0,
    totalModules: 0,
    lessonsCompleted: 0,
    totalLessons: 0,
    inProgressLessons: 0,
    pendingLessons: 0,
    xp: 0
  };

  recentModules: { name: string; progress: number; icon: string; lessons: string; id: number }[] = [];

  activities = [
    { status: 'info', icon: 'pi pi-flag', title: '¡Bienvenido!', description: 'Completa tu primera lección para comenzar', date: '' },
  ];

  progressChartData = {
    labels: ['Completado', 'En progreso', 'Pendiente'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#10b981', '#06b6d4', '#cbd5e1'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  };

  progressChartOptions = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    responsive: true,
    maintainAspectRatio: true
  };

  constructor(
    public progress: ProgressService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userStats.name = this.auth.getUser()?.name || 'Usuario';
    this.progress.fetchFromApi().pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.syncStats();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private syncStats(): void {
    const totalLessons = this.progress.getTotalLessons();
    const completedLessons = this.progress.getTotalCompletedLessons();
    const inProgress = this.progress.getInProgressLessons();
    const pending = this.progress.getPendingLessons();

    this.userStats.lessonsCompleted = completedLessons;
    this.userStats.totalLessons = totalLessons;
    this.userStats.modulesCompleted = this.progress.getModulesCompleted();
    this.userStats.totalModules = this.progress.getModules().length;
    this.userStats.xp = this.progress.getXp();
    this.userStats.streak = this.progress.getStreak();
    this.userStats.inProgressLessons = inProgress;
    this.userStats.pendingLessons = pending;
    this.userStats.levelProgress = totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100) : 0;

    this.progressChartData.datasets[0].data = [
      completedLessons,
      inProgress,
      pending,
    ];

    const modules = this.progress.getModules();
    this.recentModules = modules
      .map((m, i) => {
        const p = this.progress.getModuleProgress(i);
        return {
          name: m.moduleName,
          progress: p.pct,
          icon: MODULE_ICONS[i] || 'pi pi-book',
          lessons: `${p.completed}/${p.total} lecciones`,
          id: i,
        };
      })
      .filter(m => m.progress > 0)
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 3);

    if (completedLessons > 0) {
      this.activities = [
        { status: 'success', icon: 'pi pi-check', title: 'Lección completada', description: 'Sigue así, cada lección cuenta', date: 'Hoy' },
        { status: 'warning', icon: 'pi pi-star', title: 'Logro obtenido', description: 'Completa lecciones para ganar logros', date: '' },
        { status: 'info', icon: 'pi pi-book', title: 'Módulo iniciado', description: 'Explora todos los módulos disponibles', date: '' },
      ];
    }
  }
}
