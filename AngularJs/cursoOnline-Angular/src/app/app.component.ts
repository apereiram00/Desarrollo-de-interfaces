import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from "./components/pages/homePage/homePage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cursoOnline-Angular';
}
