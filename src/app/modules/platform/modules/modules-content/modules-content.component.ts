import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModulesService, ModuleItem } from '../../../../core/services/modules.service';
import { ProgressService } from '../../progress/progress-content/progress.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modules-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modules-content.component.html',
  styleUrl: './modules-content.component.scss'
})
export class ModulesContentComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  activeFilter = 'all';
  modules: ModuleItem[] = [];

  filterChips = [
    { key: 'all', label: 'Todos', active: true },
    { key: 'in-progress', label: 'En progreso', active: false },
    { key: 'completed', label: 'Completados', active: false }
  ];

  constructor(
    private modulesService: ModulesService,
    private progress: ProgressService
  ) {}

  ngOnInit(): void {
    this.modulesService.fetchAll().pipe(takeUntil(this.destroy$)).subscribe((modules) => {
      this.modules = modules.map((m, i) => {
        const p = this.progress.getModuleProgress(m.id - 1);
        const isCompleted = p.completed === p.total && p.total > 0;
        const isStarted = p.completed > 0;
        const isLocked = i > 0 && modules[i - 1] && !this.progress.getModuleProgress(modules[i - 1].id - 1).completedModule;
        return {
          ...m,
          lessons: p.total || m.lessons,
          completed: p.completed,
          progress: p.pct,
          status: isLocked ? 'not-started' as const : isCompleted ? 'completed' as const : isStarted ? 'in-progress' as const : 'not-started' as const,
          xp: isCompleted ? m.xp : isStarted ? Math.round(m.xp * p.pct / 100) : 0,
          isLocked,
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
