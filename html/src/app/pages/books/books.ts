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

  libraryBooks: Observable<any[]>;

  constructor(private router: Router) {
    this.libraryBooks = this.fetchData();
  }

  goToLoan(book: any) {
    this.router.navigate(['/loan'], { queryParams: { title: book.title } });
  }

  showModal = signal<boolean>(false);
  modalClass= signal<string>('');
  selectedBook: any = null;

  openModal(book: any) {
    this.selectedBook = book;
    this.showModal.set(true);
    this.modalClass.set('fade-in-up');
  }

  closeModal() {
    this.modalClass.set('fade-out-down');
    
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
