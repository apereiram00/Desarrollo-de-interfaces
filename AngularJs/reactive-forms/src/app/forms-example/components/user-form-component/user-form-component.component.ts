import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import{  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.css'
})
export class UserFormComponentComponent {
  @Output() formSubmit= new EventEmitter<any>();
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if(this.userForm.valid) {
      console.log('Formulario enviado desde el hijo:', this.userForm.value);
      this.formSubmit.emit(this.userForm.value);
      this.userForm.reset();
    } 
  }
}
