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
      img: 'assets/books/duneaprofeta.png'
    },
    {
      title: 'A király visszatér',
      author: 'J. R. R. Tolkien',
      img: 'assets/books/akiralyvisszater.png'
    },
    {
      title: 'Alapítvány és Föld',
      author: 'Isaac Asimov',
      img: 'assets/books/alapitvanyesfold.png'
    },
    {
      title: 'Hyperion',
      author: 'Dan Simmons',
      img: 'assets/books/hyperion.png'
    },
    {
      title: '1984',
      author: 'George Orwell',
      img: 'assets/books/1984.png'
    }
  ];
}
