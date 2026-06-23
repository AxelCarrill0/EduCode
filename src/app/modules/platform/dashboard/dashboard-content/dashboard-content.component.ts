import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TimelineModule } from 'primeng/timeline';
import { ChartModule } from 'primeng/chart';
import { ProgressService } from '../../progress/progress-content/progress.service';

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
export class DashboardContentComponent {
  userStats = {
    name: 'Usuario',
    levelProgress: 35,
    streak: 0,
    modulesCompleted: 0,
    totalModules: 6,
    lessonsCompleted: 0,
    totalLessons: 25,
    inProgressLessons: 0,
    pendingLessons: 25,
    xp: 0
  };

  recentModules = [
    { name: 'Introducción a Python', progress: 80, icon: 'pi pi-python', lessons: '4/5 lecciones', id: 0 },
    { name: 'Variables', progress: 50, icon: 'pi pi-database', lessons: '2/4 lecciones', id: 1 },
    { name: 'Condicionales', progress: 20, icon: 'pi pi-sitemap', lessons: '1/5 lecciones', id: 4 }
  ];

  activities = [
    { status: 'success', icon: 'pi pi-check', title: 'Lección completada', description: 'Variables en Python', date: 'Hoy, 2:30 PM' },
    { status: 'warning', icon: 'pi pi-star', title: 'Logro obtenido', description: 'Primera lección completada', date: 'Ayer' },
    { status: 'info', icon: 'pi pi-book', title: 'Módulo iniciado', description: 'Tipos de datos y estructuras', date: 'Hace 3 días' },
    { status: 'success', icon: 'pi pi-check', title: 'Ejercicio resuelto', description: 'Operadores aritméticos', date: 'Hace 5 días' }
  ];

  progressChartData = {
    labels: ['Completado', 'En progreso', 'Pendiente'],
    datasets: [{
      data: [6, 4, 7],
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
    responsive: false,
    maintainAspectRatio: false
  };

  constructor(public progress: ProgressService) {
    this.syncStats();
  }

  private syncStats(): void {
    this.userStats.lessonsCompleted = this.progress.getTotalCompletedLessons();
    this.userStats.totalLessons = this.progress.getTotalLessons();
    this.userStats.modulesCompleted = this.progress.getModulesCompleted();
    this.userStats.totalModules = this.progress.getModules().length;
    this.userStats.xp = this.progress.getXp();
    this.userStats.streak = this.progress.getStreak();
    this.userStats.inProgressLessons = this.progress.getInProgressLessons();
    this.userStats.pendingLessons = this.progress.getPendingLessons();
    this.userStats.levelProgress = this.progress.getTotalLessons() > 0
      ? Math.round((this.progress.getTotalCompletedLessons() / this.progress.getTotalLessons()) * 100) : 0;

    this.progressChartData.datasets[0].data = [
      this.progress.getTotalCompletedLessons(),
      this.progress.getInProgressLessons(),
      this.progress.getPendingLessons()
    ];

    this.recentModules.forEach(m => {
      const p = this.progress.getModuleProgress(m.id);
      m.progress = p.pct;
      m.lessons = `${p.completed}/${p.total} lecciones`;
    });
  }
}
