import { Component } from '@angular/core';
import { CardModule } from "primeng/card";

@Component({
  selector: 'app-progress-content',
  standalone: true,
  imports: [CardModule],
  templateUrl: './progress-content.component.html',
  styleUrl: './progress-content.component.scss'
})
export class ProgressContentComponent {

}
