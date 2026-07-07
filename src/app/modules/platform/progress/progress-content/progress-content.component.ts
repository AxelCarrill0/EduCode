import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressService } from './progress.service';
import { MODULE_ICONS, MODULE_COLORS, MODULE_NAMES } from '../../../../core/constants/app.constants';
import { Subject, takeUntil } from 'rxjs';

interface ModuleProgress {
  name: string;
  icon: string;
  accent: string;
  iconBg: string;
  status: number;
  lessons: number;
  lessonsCompletadas: number;
}

@Component({
  selector: 'app-progress-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './progress-content.component.html',
  styleUrl: './progress-content.component.scss'
})
export class ProgressContentComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(public progress: ProgressService) {}

  ngOnInit(): void {
    this.progress.fetchFromApi().pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get moduleProgress(): ModuleProgress[] {
    return MODULE_NAMES.map((name, i) => {
      const p = this.progress.getModuleProgress(i);
      return {
        name,
        icon: MODULE_ICONS[i] || 'pi pi-book',
        accent: MODULE_COLORS[i] || '#64748b',
        iconBg: `${MODULE_COLORS[i] || '#64748b'}1a`,
        status: p.pct,
        lessons: p.total,
        lessonsCompletadas: p.completed
      };
    });
  }

  get achievements() {
    return this.progress.getAchievements();
  }
}
