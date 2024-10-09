import { Routes } from '@angular/router';
import { CoursePage } from './components/pages/coursePage/coursePage.component';
import { ProfilePage } from './components/pages/profilePage/profilePage.component';
import { FormPage } from './components/pages/formularioPage/formPage.component';
import { HomePage } from './components/pages/homePage/homePage.component';
import { Error404Component } from './components/pages/error404/error404.component';

export const routes: Routes = [
    {path: '', component: HomePage },
    {path: 'courses', component: CoursePage},
    {path: 'profile', component: ProfilePage},
    {path: 'enroll/:id', component: FormPage},
    {path: '**', component: Error404Component}
];
export class AppModule { }
