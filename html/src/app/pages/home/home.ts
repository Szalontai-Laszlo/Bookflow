import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  // Legújabb könyvek, amik fel lettek véve az adatbázisba tömbben
  latestBooks = [
    { title: 'Dűne A próféta', author: 'Frank Herbert', img: 'assets/books/duneaprofeta.png' },
    { title: 'A király visszatér', author: 'J. R. R. Tolkien', img: 'assets/books/akiralyvisszater.png' },
    { title: 'Alapítvány és Föld', author: 'Isaac Asimov', img: 'assets/books/alapitvanyesfold.png' },
    { title: 'Hyperion', author: 'Dan Simmons', img: 'assets/books/hyperion.png' },
    { title: '1984', author: 'George Orwell', img: 'assets/books/1984.png' },
  ];
}
