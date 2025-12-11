import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']  
})
export class Books {
  libraryBooks = [
    { title: 'Dűne A próféta', author: 'Frank Herbert', img: 'assets/books/duneaprofeta.png' },
    { title: 'A király visszatér', author: 'J. R. R. Tolkien', img: 'assets/books/akiralyvisszater.png' },
    { title: 'Alapítvány és Föld', author: 'Isaac Asimov', img: 'assets/books/alapitvanyesfold.png' },
    { title: 'Hyperion', author: 'Dan Simmons', img: 'assets/books/hyperion.png' },
    { title: '1984', author: 'George Orwell', img: 'assets/books/1984.png' },
    { title: 'A Gyűrűk Ura', author: 'J. R. R. Tolkien', img: 'assets/books/agyurukura.png' },
    { title: 'Szél Neve', author: 'Patrick Rothfuss', img: 'assets/books/aszelneve.png' },
    { title: 'Hobbit', author: 'J. R. R. Tolkien', img: 'assets/books/thehobbit.png' },
    { title: 'Murder On The Orient Express', author: 'Agatha Christie', img: 'assets/books/murdertheorientexpress.png' },
    { title: 'Harry Potter: Bölcsek köve', author: 'J.K. Rowling', img: 'assets/books/harrypotterphilosophersstone.png'}
  ];

  constructor(private router: Router) {}

  goToLoan(book: any) {
    this.router.navigate(['/loan'], { queryParams: { title: book.title } });
  }

  isModalOpen = false;
  selectedBook: any = null;

  openModal(book: any) {
    this.selectedBook = book;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedBook = null;
  }
}
