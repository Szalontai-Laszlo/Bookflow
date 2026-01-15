import { CommonModule, } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-loan',
  imports: [CommonModule],
  templateUrl: './loan.html',
  styleUrl: './loan.css',
})
export class Loan {
  libraryBooks: Observable<any[]>;

  constructor(private router: Router) {
      this.libraryBooks = this.fetchData();
  }
  showModal = signal<boolean>(false);
  modalMessage = signal<string>('');
  modalClass = signal<string>('');

  // függvény, ami sikeres gomblenyomás esetén feldob egy modalt
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
  private http = inject(HttpClient)
  fetchData() {
    return this.http.get<any[]>("http://localhost:3000/api/books/loan_books");
  }
}
