import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [ButtonModule, InputTextModule, CardModule, RouterModule],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss',

})
export class HomeContentComponent {
  visible: boolean = false;
}
