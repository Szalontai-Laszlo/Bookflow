import { CommonModule, } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-loan',
  imports: [CommonModule, FormsModule],
  templateUrl: './loan.html',
  styleUrl: './loan.css',
})
export class Loan {
  name = '';
  email = '';
  gender = '';
  userId = 0;
  
  selectedBookId = 0;
  borrowStart = '';
  borrowEnd = '';

  libraryBooks: Observable<any[]>;

  constructor(private router: Router, private auth: AuthService) {
      this.libraryBooks = this.fetchData();
      this.loadUser();
  }

  loadUser() {
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if (u) {
        this.name = u.name || '';
        this.email = u.email || '';
        this.gender = u.gender || '';
        this.userId = u.id || 0;
      }
    } catch {

    }
  }

  showModal = signal<boolean>(false);
  modalMessage = signal<string>('');
  modalClass = signal<string>('');

  // függvény, ami sikeres gomblenyomás esetén feldob egy modalt
  onRentSubmit() {
    // Összegyűjtjük a kölcsönzés adatait
    const bookSelect = document.getElementById('loan-book_name') as HTMLSelectElement;
    const startInput = document.getElementById('loan-from') as HTMLInputElement;
    const endInput = document.getElementById('loan-when') as HTMLInputElement;

    if (!bookSelect || !startInput || !endInput) {
      return;
    }

    // A könyv ID kinyerése a selectből
    this.selectedBookId = parseInt(bookSelect.value);
    this.borrowStart = startInput.value;
    this.borrowEnd = endInput.value;

    if (!this.selectedBookId || !this.borrowStart || !this.borrowEnd) {
      this.modalMessage.set('Kérjük, töltse ki az összes mezőt');
      this.showModal.set(true);
      this.modalClass.set('fade-in-up');
      return;
    }

    // Küldés a backendnek
    this.http.post('http://localhost:3000/api/borrows', {
      book_id: this.selectedBookId,
      user_id: this.userId,
      borrow_start: this.borrowStart,
      borrow_end: this.borrowEnd
    }).subscribe({
      next: (response: any) => {
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
      },
      error: (err) => {
        console.error('Hiba a kölcsönzés rögzítése közben:', err);
        this.modalMessage.set('Hiba a kölcsönzés rögzítése közben');
        this.showModal.set(true);
        this.modalClass.set('fade-in-up');
      }
    });
  }
  private http = inject(HttpClient)
  fetchData() {
    return this.http.get<any[]>("http://localhost:3000/api/books/loan_books");
  }
}