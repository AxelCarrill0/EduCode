import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from "primeng/button";
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-layout-content',
  standalone: true,
  imports: [RouterModule, ButtonModule, AvatarModule, TagModule],
  templateUrl: './layout-content.component.html',
  styleUrl: './layout-content.component.scss'
})
export class LayoutContentComponent {

}