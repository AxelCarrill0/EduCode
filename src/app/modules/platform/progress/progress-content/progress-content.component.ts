import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressService, MODULE_NAMES } from './progress.service';

interface ModuleProgress {
  name: string;
  icon: string;
  accent: string;
  iconBg: string;
  status: number;
  lessons: number;
  lessonsCompletadas: number;
}

const MODULE_ICONS = ['pi pi-python', 'pi pi-database', 'pi pi-table', 'pi pi-calculator', 'pi pi-sitemap', 'pi pi-reload'];
const MODULE_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

@Component({
  selector: 'app-progress-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './progress-content.component.html',
  styleUrl: './progress-content.component.scss'
})
export class ProgressContentComponent {
  constructor(public progress: ProgressService) {}

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
