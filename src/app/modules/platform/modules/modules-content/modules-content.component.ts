import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ModuleItem {
  name: string;
  description: string;
  icon: string;
  accent: string;
  iconBg: string;
  lessons: number;
  completed: number;
  progress: number;
  difficulty: string;
  status: 'not-started' | 'in-progress' | 'completed';
  xp: number;
  isNew?: boolean;
}

@Component({
  selector: 'app-modules-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modules-content.component.html',
  styleUrl: './modules-content.component.scss'
})
export class ModulesContentComponent {
  activeFilter = 'all';

  filterChips = [
    { key: 'all', label: 'Todos', active: true },
    { key: 'in-progress', label: 'En progreso', active: false },
    { key: 'completed', label: 'Completados', active: false }
  ];

  modules: ModuleItem[] = [
    {
      name: 'Introducción a Python',
      description: 'Conoce los fundamentos de la programación con Python desde cero.',
      icon: 'pi pi-python',
      accent: '#10b981',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      lessons: 5,
      completed: 4,
      progress: 80,
      difficulty: 'Principiante',
      status: 'in-progress',
      xp: 250
    },
    {
      name: 'Variables',
      description: 'Aprende a almacenar y manipular información en tus programas.',
      icon: 'pi pi-database',
      accent: '#3b82f6',
      iconBg: 'rgba(59, 130, 246, 0.1)',
      lessons: 4,
      completed: 2,
      progress: 50,
      difficulty: 'Principiante',
      status: 'in-progress',
      xp: 180
    },
    {
      name: 'Tipos de datos',
      description: 'Descubre cómo Python maneja textos, números y valores booleanos.',
      icon: 'pi pi-table',
      accent: '#8b5cf6',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      lessons: 4,
      completed: 0,
      progress: 0,
      difficulty: 'Principiante',
      status: 'not-started',
      xp: 200
    },
    {
      name: 'Operadores',
      description: 'Domina las operaciones aritméticas, lógicas y de comparación.',
      icon: 'pi pi-calculator',
      accent: '#f59e0b',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      lessons: 3,
      completed: 0,
      progress: 0,
      difficulty: 'Principiante',
      status: 'not-started',
      xp: 150
    },
    {
      name: 'Condicionales',
      description: 'Controla el flujo de tu programa con if, else y elif.',
      icon: 'pi pi-sitemap',
      accent: '#ef4444',
      iconBg: 'rgba(239, 68, 68, 0.1)',
      lessons: 5,
      completed: 0,
      progress: 0,
      difficulty: 'Intermedio',
      status: 'not-started',
      xp: 300
    },
    {
      name: 'Bucles',
      description: 'Automatiza tareas repetitivas con for y while.',
      icon: 'pi pi-reload',
      accent: '#06b6d4',
      iconBg: 'rgba(6, 182, 212, 0.1)',
      lessons: 4,
      completed: 0,
      progress: 0,
      difficulty: 'Intermedio',
      status: 'not-started',
      xp: 280,
      isNew: true
    }
  ];

  get totalCompleted(): number {
    return this.modules.reduce((sum, m) => sum + m.completed, 0);
  }

  get totalLessons(): number {
    return this.modules.reduce((sum, m) => sum + m.lessons, 0);
  }

  get overallProgress(): number {
    return this.totalLessons > 0 ? Math.round((this.totalCompleted / this.totalLessons) * 100) : 0;
  }

  get totalXp(): number {
    return this.modules.reduce((sum, m) => sum + (m.status === 'completed' ? m.xp : m.status === 'in-progress' ? Math.round(m.xp * m.progress / 100) : 0), 0);
  }

  get filteredModules(): ModuleItem[] {
    if (this.activeFilter === 'all') return this.modules;
    return this.modules.filter(m => m.status === this.activeFilter);
  }

  get filteredCount(): number {
    return this.filteredModules.length;
  }

  setFilter(key: string): void {
    this.activeFilter = key;
    this.filterChips.forEach(chip => chip.active = chip.key === key);
  }
}
