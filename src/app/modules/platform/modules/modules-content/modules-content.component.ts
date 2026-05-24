import { Component } from '@angular/core';
import { CardModule } from "primeng/card";

@Component({
  selector: 'app-modules-content',
  standalone: true,
  imports: [CardModule],
  templateUrl: './modules-content.component.html',
  styleUrl: './modules-content.component.scss'
})
export class ModulesContentComponent {

}
