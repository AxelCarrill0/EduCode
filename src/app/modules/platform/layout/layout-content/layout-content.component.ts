import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";


@Component({
  selector: 'app-layout-content',
  standalone: true,
  imports: [RouterModule, CardModule, ButtonModule],
  templateUrl: './layout-content.component.html',
  styleUrl: './layout-content.component.scss'
})
export class LayoutContentComponent {

}
