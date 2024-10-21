import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFormComponentComponent } from "./forms-example/components/user-form-component/user-form-component.component";
import { UserListComponentComponent } from './forms-example/components/user-list-component/user-list-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserFormComponentComponent, UserListComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactive-forms';
}
