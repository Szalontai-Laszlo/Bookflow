import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Books } from './pages/books/books';
import { Loan } from './pages/loan/loan';
import { AboutUs } from './pages/about-us/about-us';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Authors } from './pages/authors/authors';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
    {path: '', component:Home},
    {path: 'books', component: Books},
    {path: 'loan', component: Loan},
    {path: 'about_us', component: AboutUs},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'authors', component: Authors},
    {path: 'profile', component: Profile}
];
