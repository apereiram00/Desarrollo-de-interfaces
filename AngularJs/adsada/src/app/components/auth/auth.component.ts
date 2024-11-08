import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  register() {
    const user = {
      id: '',
      email: this.email?.value,
      password: this.password?.value,
    };
    this.authService.register(user).subscribe({
      next: () => {
        alert('Registrado con exito.');
        this.router.navigate(['/auth']);
      },
      error: (err) => console.error('Error en el registro:', err),
    });
  }

  login() {
    const { email, password } = this.authForm.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); 
        alert('Inicio de sesión valido.');
        this.router.navigate(['/park']);
      },
      error: (err) => console.error('Error al iniciar sesión:', err),
    });
  }
}
