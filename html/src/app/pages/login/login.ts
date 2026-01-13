import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  // jelszó megjelenítés változó, aminek az alap értéke false
  showPassword = false;
  constructor(private router: Router) {}

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
}
