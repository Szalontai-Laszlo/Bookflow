import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  name = '';
  email = '';
  gender = '';
  password = '';
  error = signal('');
  success = signal('');

  private api = 'http://localhost:3000/api';

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {
    this.loadUser();
  }

  loadUser() {
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if (u) {
        this.name = u.name || '';
        this.email = u.email || '';
        this.gender = u.gender || '';
      }
    } catch {

    }
  }

  // mentés: frissít lokalStorage-t, opcionálisan hív backendet ha van update végpont
  save() {
    const payload: any = { name: this.name, email: this.email, gender: this.gender };
    if (this.password) payload.password = this.password;

    // ha van /api/update_profile végpont, elküldjük; ha nincs, csak localStorage update
    this.http.post<any>(`${this.api}/update_profile`, payload).subscribe({
      next: res => {
        // frissítjük a lokális usert (backend visszaadása esetén használhatod azt)
        const updated = res?.user ?? payload;
        localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user') || '{}'), ...updated }));
        this.success.set('Sikeres mentés');
        this.error.set('');
      },
      error: () => {
        // ha nincs backend, tároljuk helyben és jelezzük sikeresnek
        localStorage.setItem('user', JSON.stringify({ name: this.name, email: this.email, gender: this.gender }));
        this.success.set('Mentés helyileg sikeres (backend nem elérhető)');
        this.error.set('');
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

  logout(): void {
    this.auth.logout();
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('user-changed'));
    this.router.navigate(['/login']);
  }
}