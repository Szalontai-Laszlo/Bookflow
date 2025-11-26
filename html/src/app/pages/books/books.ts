import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  libraryBooks = [
    { title: 'Dűne – A próféta', author: 'Frank Herbert', img: 'assets/books/dune2.jpg' },
    { title: 'A király visszatér', author: 'J. R. R. Tolkien', img: 'assets/books/lotr3.jpg' },
    { title: 'Alapítvány és Föld', author: 'Isaac Asimov', img: 'assets/books/foundation5.jpg' },
    { title: 'Hyperion', author: 'Dan Simmons', img: 'assets/books/hyperion.jpg' },
    { title: '1984', author: 'George Orwell', img: 'assets/books/1984.jpg' },
    { title: 'A Gyűrűk Ura', author: 'J. R. R. Tolkien', img: 'assets/books/lotr1.jpg' },
    { title: 'Szél Neve', author: 'Patrick Rothfuss', img: 'assets/books/nameofthewind.jpg' },
    { title: 'Hobbit', author: 'J. R. R. Tolkien', img: 'assets/books/hobbit.jpg' },
    { title: 'Neuromancer', author: 'William Gibson', img: 'assets/books/neuromancer.jpg' },
  ];

  constructor(private router: Router) {}

  goToLoan(book: any) {
    // Lehetőség: átadni a kiválasztott könyvet query param-ként
    this.router.navigate(['/loan'], { queryParams: { title: book.title } });
  }
}
