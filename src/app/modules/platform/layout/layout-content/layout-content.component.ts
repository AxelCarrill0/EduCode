import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from "primeng/card";


@Component({
  selector: 'app-layout-content',
  standalone: true,
  imports: [RouterModule, CardModule],
  templateUrl: './layout-content.component.html',
  styleUrl: './layout-content.component.scss'
})
export class LayoutContentComponent {

}
