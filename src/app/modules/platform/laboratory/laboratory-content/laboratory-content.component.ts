import { Component } from '@angular/core';
import { CardModule } from "primeng/card";

@Component({
  selector: 'app-laboratory-content',
  standalone: true,
  imports: [CardModule],
  templateUrl: './laboratory-content.component.html',
  styleUrl: './laboratory-content.component.scss'
})
export class LaboratoryContentComponent {

}
