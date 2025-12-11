import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import {
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // Iconok a dark/light váltóhoz
  faSun = faSun;
  faMoon = faMoon;

  // Friss könyvek blokk
  latestBooks: any[] = [];
    constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/api/getBooks.php').subscribe({
      next: (data) => {
        this.latestBooks = Array.isArray(data) ? data.slice(0, 5) : [];
      },
      error: () => {
        this.latestBooks = [];
      }
    });
  }
}
