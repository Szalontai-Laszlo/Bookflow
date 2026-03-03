import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  name = '';
  email = '';
  password = '';
  passwordValidate = '';
  gender = '';
  showPassword = false;
  error = signal('');
  success = signal('');
  
  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // függvény, ami egy gombra van ráhúzva,
  // megnyomás esetén a showPassword értéke true lesz, és ez visszafele is működik
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // függvény, ami egy linkre van ráhúzva
  // megnyomás esetén átdob a regisztrációs oldalra
  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (!this.name || !this.email || !this.password || !this.gender) {
      this.error.set('Tölts ki minden mezőt.');
      return;
    }
    if (this.password !== this.passwordValidate) {
      this.error.set('A jelszavak nem egyeznek.');
      return;
    }

    const payload = { name: this.name, email: this.email, password: this.password, gender: this.gender };
    this.http.post<any>(`${this.api}/register`, payload).subscribe({
      next: () => {
        this.success.set('Sikeres regisztráció. Jelentkezz be.');
        this.error.set('');
        this.router.navigate(['/login']);
      },
      error: err => {
        this.error.set(err?.error?.message || 'Regisztráció közben hiba történt.');
        this.success.set('');
      }
    });
  }
}
