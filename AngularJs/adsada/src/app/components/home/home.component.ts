import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/park']);
    }
  }
  
  goToAuth() {
    this.router.navigate(['/auth']);
  }
}
