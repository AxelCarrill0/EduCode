import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';
import { MODULE_LESSON_COUNTS, MODULE_XPS } from '../constants/app.constants';

export interface ModuleItem {
  id: number;
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
  isLocked?: boolean;
}

interface ModuleResponse {
  modules: ModuleDTO[];
}

interface ModuleDTO {
  id: number;
  title: string;
  description: string;
  icon?: string;
  accent?: string;
  icon_bg?: string;
  difficulty?: string;
}

@Injectable({ providedIn: 'root' })
export class ModulesService {
  private cached: ModuleItem[] = [];

  constructor(private api: ApiService) {}

  fetchAll(): Observable<ModuleItem[]> {
    return this.api.get<ModuleResponse>('/modules').pipe(
      map((res) => {
        this.cached = (res.modules || []).map((m: ModuleDTO) => ({
          id: m.id,
          name: m.title,
          description: m.description,
          icon: m.icon || 'pi pi-book',
          accent: m.accent || '#10b981',
          iconBg: m.icon_bg || 'rgba(16, 185, 129, 0.1)',
          lessons: MODULE_LESSON_COUNTS[m.id - 1] || 0,
          completed: 0,
          progress: 0,
          difficulty: m.difficulty || 'Principiante',
          status: 'not-started' as const,
          xp: MODULE_XPS[m.id - 1] || 100,
        }));
        return this.cached;
      }),
      catchError(() => of(this.cached.length ? this.cached : this.getDefaultModules()))
    );
  }

  getCached(): ModuleItem[] {
    return this.cached;
  }

  private getDefaultModules(): ModuleItem[] {
    return [
      { id: 1, name: 'Introducción a Python', description: 'Conoce los fundamentos de la programación con Python desde cero.', icon: 'pi pi-python', accent: '#10b981', iconBg: 'rgba(16, 185, 129, 0.1)', lessons: 5, completed: 0, progress: 0, difficulty: 'Principiante', status: 'not-started', xp: 250 },
      { id: 2, name: 'Variables', description: 'Aprende a almacenar y manipular información en tus programas.', icon: 'pi pi-database', accent: '#3b82f6', iconBg: 'rgba(59, 130, 246, 0.1)', lessons: 4, completed: 0, progress: 0, difficulty: 'Principiante', status: 'not-started', xp: 180 },
      { id: 3, name: 'Tipos de datos', description: 'Descubre cómo Python maneja textos, números y valores booleanos.', icon: 'pi pi-table', accent: '#8b5cf6', iconBg: 'rgba(139, 92, 246, 0.1)', lessons: 4, completed: 0, progress: 0, difficulty: 'Principiante', status: 'not-started', xp: 200 },
      { id: 4, name: 'Operadores', description: 'Domina las operaciones aritméticas, lógicas y de comparación.', icon: 'pi pi-calculator', accent: '#f59e0b', iconBg: 'rgba(245, 158, 11, 0.1)', lessons: 3, completed: 0, progress: 0, difficulty: 'Principiante', status: 'not-started', xp: 150 },
      { id: 5, name: 'Condicionales', description: 'Controla el flujo de tu programa con if, else y elif.', icon: 'pi pi-sitemap', accent: '#ef4444', iconBg: 'rgba(239, 68, 68, 0.1)', lessons: 5, completed: 0, progress: 0, difficulty: 'Intermedio', status: 'not-started', xp: 300 },
      { id: 6, name: 'Bucles', description: 'Automatiza tareas repetitivas con for y while.', icon: 'pi pi-reload', accent: '#06b6d4', iconBg: 'rgba(6, 182, 212, 0.1)', lessons: 4, completed: 0, progress: 0, difficulty: 'Intermedio', status: 'not-started', xp: 280, isNew: true },
    ];
  }
}
