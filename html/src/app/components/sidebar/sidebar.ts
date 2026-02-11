import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBook,faBookOpen,faHome,faBookmark,
  faUsers,faArrowLeft,faArrowRightToBracket, faPen,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth';

interface SidebarItem 
{
    icon: IconDefinition;
    label: string;
    route: string;
    isActive?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {

  // a sidebarban használt iconok tömbje
  icon = {
    faBook,faBookOpen,faHome,faBookmark,
    faUsers,faArrowLeft,faArrowRightToBracket,
    faPen
  }

  isLeftNavOpen = signal<boolean>(true);
  constructor(private router: Router, public auth: AuthService) {
    this.syncLogin();
    window.addEventListener('user-changed', () => this.syncLogin());
  }
  
  // navItems tömb, amibe különféle objektumok vannak, 
  // innen vannak kivéve a sidebar navigációs részéhez kellő iconok,
  // nevek és route-ok
  navItems: SidebarItem[] = [
    {
      icon: this.icon.faHome,
      label: 'Kezdőlap',
      route: '/',
      isActive: true
    },

    {
      icon: this.icon.faBookOpen,
      label: 'Könyvtár',
      route: '/books',
      isActive: false
    },

    {
      icon: this.icon.faPen,
      label: 'Szerzők',
      route: '/authors',
      isActive: false
    },

    {
      icon: this.icon.faBookmark,
      label: 'Kölcsönzés',
      route: '/loan',
      isActive: false
    },

    {
      icon: this.icon.faUsers,
      label: 'Rólunk',
      route: '/about_us',
      isActive: false
    },
  ];

  // ez egy külön login objektum ami a login iconját, nevét és routeját tartalmazza
  login: SidebarItem = {
    icon: this.icon.faArrowRightToBracket,
    label: 'Bejelentkezés',
    route: '/login',
    isActive: false
  }

  private syncLogin(): void {
    const u = this.user;
    if (this.auth.isLoggedIn() && u && u.name) {
      this.login.route = '/profile';
      this.login.label = u.name;
    } else {
      this.login.route = '/login';
      this.login.label = 'Bejelentkezés';
    }
  }

  get user() {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  }
  

  // amikor kiválasztjuk a menüelemet, 
  // frissülnek az isActive mezők és átnavigál a kiválaszott oldalra
  activeRoute(item: SidebarItem, index?: number): void {
    this.navItems.forEach(n => n.isActive = false);
    this.login.isActive = false;

    if (item === this.login) {
      this.login.isActive = true;
      this.router.navigateByUrl(this.login.route); // navigál a beállított route-ra
      return;
    }

    if (typeof index === 'number' && index >= 0 && index < this.navItems.length) {
      this.navItems[index].isActive = true;
    } else {
      const idx = this.navItems.findIndex(n => n.route === item.route);
      if (idx !== -1) this.navItems[idx].isActive = true;
    }

    this.router.navigateByUrl(item.route);
  }
}
