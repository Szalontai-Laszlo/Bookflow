import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = signal("");

  // jelszó megjelenítés változó, aminek az alap értéke false
  showPassword = false;
  constructor(
      private auth: AuthService,
      private router: Router) 
    {}

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
        next: () => {
          this.router.navigate(['']);
        },
        error: () => {
          this.error.set('Hibás Email vagy Jelszó')
        }
    })
  }
}
