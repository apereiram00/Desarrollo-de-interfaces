import { Component } from '@angular/core';
import { UserFormComponentComponent } from "../user-form-component/user-form-component.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list-component',
  standalone: true,
  imports: [UserFormComponentComponent,CommonModule],
  templateUrl: './user-list-component.component.html',
  styleUrl: './user-list-component.component.css',
})
export class UserListComponentComponent {
  datosFormulario: any[] = [];

  onFormSubmitted(data: any) {
    console.log('Datos del formulario en el padre:', data);
    this.datosFormulario.push(data);
  }
}
