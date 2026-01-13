import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Book = {
  title : string;
  author: string;
  img   : string;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']  
})
export class Books {

  // változó, amibe eltároljuk az adatbázisból érkező könyveket
  libraryBooks: Observable<any[]>;

  constructor(private router: Router) {
    this.libraryBooks = this.fetchData();
  }

  // függvény, ami egy linkre van ráhúzva,
  // megnyomás esetén átdob a kölcsönzés oldalra
  goToLoan(book: any) {
    this.router.navigate(['/loan'], 
    { queryParams: { title: book.title } });
  }

  showModal = signal<boolean>(false);
  modalClass= signal<string>('');
  selectedBook: any = null;

  // függvény, ami egy gombra van ráhúzva,
  // megnyomás esetén feldob egy modalt animálva, 
  // amin az adott könyv infói találhatóak
  openModal(book: any) {
    this.selectedBook = book;
    this.showModal.set(true);
    this.modalClass.set('fade-in-up');
  }

  // függvény, ami egy gombra van ráhúzva,
  // megnyomás esetén bezárja az adott modalt 500ms késleltetéssel, animálva
  closeModal() {
    this.modalClass.set('fade-out-down');
    
    // 500ms késleltetés a modal bezárására
    setTimeout(() => {
      this.showModal.set(false);
      this.selectedBook = null;
      this.modalClass.set(''); 
    }, 500);
  }
  private http = inject(HttpClient)
  fetchData() {
    return this.http.get<any[]>("http://localhost:3000/api/books");
  }
}
