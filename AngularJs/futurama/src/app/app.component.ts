import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SimpsonsComponent } from './components/aviones/simpsons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpsonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Padre de familia';
}
