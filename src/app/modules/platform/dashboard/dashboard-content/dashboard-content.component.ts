import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { TimelineModule } from 'primeng/timeline';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TagModule,
    ProgressBarModule,
    RouterModule,
    ButtonModule,
    AvatarModule,
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
    level: 'Básico',
    levelProgress: 35,
    streak: 5,
    modulesCompleted: 3,
    totalModules: 7,
    lessonsCompleted: 6,
    totalLessons: 17,
    inProgressLessons: 4,
    pendingLessons: 7,
    xp: 1250
  };

  recentModules = [
    { name: 'Introducción a Python', progress: 80, icon: 'pi pi-python', lessons: '4/5 lecciones' },
    { name: 'Variables y tipos', progress: 50, icon: 'pi pi-database', lessons: '2/4 lecciones' },
    { name: 'Estructuras de control', progress: 20, icon: 'pi pi-sitemap', lessons: '1/5 lecciones' }
  ];

  activities = [
    { status: 'success', icon: 'pi pi-check', title: 'Lección completada', description: 'Variables en Python', date: 'Hoy, 2:30 PM' },
    { status: 'warning', icon: 'pi pi-star', title: 'Logro obtenido', description: 'Primera lección completada', date: 'Ayer' },
    { status: 'info', icon: 'pi pi-book', title: 'Módulo iniciado', description: 'Tipos de datos y estructuras', date: 'Hace 3 días' },
    { status: 'success', icon: 'pi pi-check', title: 'Ejercicio resuelto', description: 'Operadores aritméticos', date: 'Hace 5 días' }
  ];

  achievements = [
    { name: 'Primera lección', icon: 'pi pi-star-fill', earned: true },
    { name: 'Racha de 5 días', icon: 'pi pi-bolt', earned: true },
    { name: '5 ejercicios resueltos', icon: 'pi pi-check-circle', earned: true },
    { name: 'Completar primer módulo', icon: 'pi pi-trophy', earned: false },
    { name: '10 ejercicios resueltos', icon: 'pi pi-code', earned: false }
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
}