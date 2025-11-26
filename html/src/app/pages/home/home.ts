import { Component } from '@angular/core';
import {
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Iconok a dark/light váltóhoz
  faSun = faSun;
  faMoon = faMoon;

  // Friss könyvek blokk
  latestBooks = [
    {
      title: 'Dűne – A próféta',
      author: 'Frank Herbert',
      img: 'assets/books/dune2.jpg'
    },
    {
      title: 'A király visszatér',
      author: 'J. R. R. Tolkien',
      img: 'assets/books/lotr3.jpg'
    },
    {
      title: 'Alapítvány és Föld',
      author: 'Isaac Asimov',
      img: 'assets/books/foundation5.jpg'
    },
    {
      title: 'Hyperion',
      author: 'Dan Simmons',
      img: 'assets/books/hyperion.jpg'
    },
    {
      title: '1984',
      author: 'George Orwell',
      img: 'assets/books/1984.jpg'
    }
  ];
}
