import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook,faBookOpen,faHome,faBookmark,faUsers,faArrowLeft,faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { SidebarItem } from '../../interfaces/sidebar.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly faBook = faBook;
  readonly faBookOpen = faBookOpen;
  readonly faHome = faHome;
  readonly faBookmark = faBookmark;
  readonly faUsers = faUsers;
  readonly faArrowLeft = faArrowLeft;
  readonly faArrowRightToBracket = faArrowRightToBracket;

  isLeftNavOpen = signal<boolean>(true);
  constructor(private router: Router) {}
  navItems: SidebarItem[] = [
    {
      icon: this.faHome,
      label: 'Kezdőlap',
      route: '/',
      isActive: true
    },

    {
      icon: this.faBookOpen,
      label: 'Könyvtár',
      route: '/books',
      isActive: false
    },

    {
      icon: this.faBookmark,
      label: 'Kölcsönzés',
      route: '/loan',
      isActive: false
    },

    {
      icon: this.faUsers,
      label: 'Rólunk',
      route: '/about_us',
      isActive: false
    },
  ];

  activeRoute(item: SidebarItem, index: number): void {
    this.navItems.map((navItem, i) => {
      navItem.isActive = i === index;

      this.router.navigateByUrl(item.route);
    });
  }
}
