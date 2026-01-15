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
  templateUrl: './authors.html',
  styleUrls: ['./authors.css']  
})
export class Authors {

  // változó, amibe eltároljuk az adatbázisból érkező könyveket
  authors: Observable<any[]>;

  constructor(private router: Router) {
    this.authors = this.fetchData();
  }

  showModal = signal<boolean>(false);
  modalClass= signal<string>('');
  selectedAuthor: any = null;

  // függvény, ami egy gombra van ráhúzva,
  // megnyomás esetén feldob egy modalt animálva, 
  // amin az adott könyv infói találhatóak
  openModal(author: any) {
    this.selectedAuthor = author;
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
      this.selectedAuthor = null;
      this.modalClass.set(''); 
    }, 500);
  }
  private http = inject(HttpClient)
  fetchData() {
    return this.http.get<any[]>("http://localhost:3000/api/authors");
  }
}
