import { Component } from '@angular/core';
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-settings-content',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule],
  templateUrl: './settings-content.component.html',
  styleUrl: './settings-content.component.scss'
})
export class SettingsContentComponent {

}
