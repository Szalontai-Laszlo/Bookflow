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

  constructor(private router: Router) {
    this.latestBooks = this.fetchData();
  }
  
  private http = inject(HttpClient)

  // adatok lekérése az adatbázisból
  fetchData() {
    return this.http.get<any[]>("http://localhost:3000/api/books").pipe(
      map(books => books.slice(-5))
    );
  }
  // visszatér az utolsó könyv id-jával
  fetchlastUserId() {
    return this.http.get<any[]>("http://localhost:3000/api/books/last_book_id")
  }
}
