import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FamilyguyComponent } from './components/familyguy/familyguy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FamilyguyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Padre de familia';
}
