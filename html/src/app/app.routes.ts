import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Books } from './pages/books/books';
import { Loan } from './pages/loan/loan';

export const routes: Routes = [
    {path: '', component:Home},
    {path: 'books', component: Books},
    {path: 'loan', component: Loan}
];
