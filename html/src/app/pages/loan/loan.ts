import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan',
  imports: [CommonModule],
  templateUrl: './loan.html',
  styleUrl: './loan.css',
})
export class Loan {
  libraryBooks = [
    { title: 'Dűne – A próféta', author: 'Frank Herbert' },
    { title: 'A király visszatér', author: 'J. R. R. Tolkien'},
    { title: 'Alapítvány és Föld', author: 'Isaac Asimov'},
    { title: 'Hyperion', author: 'Dan Simmons'},
    { title: '1984', author: 'George Orwell'},
    { title: 'A Gyűrűk Ura', author: 'J. R. R. Tolkien'},
    { title: 'Szél Neve', author: 'Patrick Rothfuss'},
    { title: 'Hobbit', author: 'J. R. R. Tolkien'},
    { title: 'Murder On The Orient Express', author: 'Agatha Christie'},
    { title: 'Harry Potter: Bölcsek köve', author: 'J.K. Rowling'}
  ];

  showModal = signal<boolean>(false);
  modalMessage = signal<string>('');
  modalClass = signal<string>('');

  onRentSubmit() {
    this.modalMessage.set('Sikeres kölcsönzés');
    this.showModal.set(true);
    this.modalClass.set('fade-in-up');

    // 2.5 másodperc után indítsuk el a fade-out animációt
    setTimeout(() => {
      this.modalClass.set('fade-out-down');
    }, 2500);

    // 3 másodperc után zárjuk be a modalt
    setTimeout(() => {
      this.showModal.set(false);
      this.modalMessage.set('');
    }, 3000);
  }
}
