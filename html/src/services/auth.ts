import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Paraméterként emailt és jelszót kap
  login(email: string, password: string) {

    // POST kérés küldése a backend login végpontjára
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(

      // A tap nem módosítja a választ, csak "mellékhatást" hajt végre
      tap(res => {

        // A backend által visszaküldött user objektum elmentése localStorage-be
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  // ha bevan jelentkezve false ha igen true
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  //Kijelentkezesnel torli a felhasznalo adatait
  logout() {
    localStorage.removeItem('user');
  }
}