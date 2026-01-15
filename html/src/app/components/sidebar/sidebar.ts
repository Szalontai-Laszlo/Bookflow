import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faBook,faBookOpen,faHome,faBookmark,
  faUsers,faArrowLeft,faArrowRightToBracket, faPen,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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
  styleUrl: './sidebar.css',
})
export class Sidebar {

  // a sidebarban használt iconok tömbje
  icon = {
    faBook,faBookOpen,faHome,faBookmark,
    faUsers,faArrowLeft,faArrowRightToBracket,
    faPen
  }

  isLeftNavOpen = signal<boolean>(true);
  constructor(private router: Router) {}
  
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
  };

  // amikor kiválasztjuk a menüelemet, 
  // frissülnek az isActive mezők és átnavigál a kiválaszott oldalra
  activeRoute(item: SidebarItem, index: number): void { 

    // navItemsen végigmegy, és az indexhez tartozót jelöli aktívnak
    this.navItems.forEach((navItem, i) => { 
      navItem.isActive = i === index; 
    }); 

    // hogyha a login objektum van kiválasztva, akkor az legyen aktiválva
    this.login.isActive = item === this.login; 

    // átnavigál az oldalra
    this.router.navigateByUrl(item.route); 
  }
}
