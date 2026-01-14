import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  // változó, amibe eltároljuk az adatbázisból érkező könyveket
  latestBooks: Observable<any[]>;

  // változó, amibe eltároljuk az elérhető könyvek számát
  totalBooks = 0;

  constructor(private router: Router) {
    this.latestBooks = this.fetchData();
    this.fetchTotalBooks();
  }
  
  private http = inject(HttpClient)

  // adatok lekérése az adatbázisból
  fetchData() {
    return this.http.get<any[]>("http://localhost:3000/api/books").pipe(
      map(books => books.slice(-5))
    );
  }

  // lekérjük az elérhető könyveket az adatbázisból
  fetchTotalBooks() {
    this.http.get<{ count: number }>("http://localhost:3000/api/books/last_book_id")
      .subscribe({

        // ha megkapjuk az összes elérhető könyvek számát beállítjuk (feltéve ha nincs 0)
        next: data => this.totalBooks = typeof data?.count === 'number' ? data.count : 0,

        // ha gáz van az alap érték 0
        error: () => this.totalBooks = 0
      });
  }
}
