import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AuthComponent } from './app/components/auth/auth.component';
import { ParkComponent } from './app/components/park/park.component';
import { HomeComponent } from './app/components/home/home.component';
import { Route } from '@angular/router';  

const routes: Route[] = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, pathMatch: 'full' },
  { path: 'park', component: ParkComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),  
  ],
}).catch((err) => console.error(err));
