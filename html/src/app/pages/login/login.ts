import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Component, signal, ɵɵi18nApply } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  error = signal("");

  checkforUser() {
    const u = JSON.parse(localStorage.getItem('user') || 'null');

    if(u){
      this.router.navigate(['']);
    }
  }

  // jelszó megjelenítés változó, aminek az alap értéke false
  showPassword = false;
  constructor( private auth: AuthService, private router: Router) {}

  // függvény, ami egy gombra van ráhúzva,
  // megnyomás esetén a showPassword értéke true lesz, és ez visszafele is működik
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // függvény, ami egy linkre van ráhúzva
  // megnyomás esetén átdob a regisztrációs oldalra
  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        // ha AuthService nem dispatch-el, tegyük meg itt is
        window.dispatchEvent(new CustomEvent('user-changed', { detail: res?.user || null }));
        // navigálás home-ra
        this.router.navigate(['/']);
      },
      error: () => {
        this.error.set('Hibás Email vagy Jelszó');
      }
    });
  }
}
