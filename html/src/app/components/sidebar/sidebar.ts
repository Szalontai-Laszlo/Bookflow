import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook,faBookOpen,faHome,faBookmark,faUsers,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { SidebarItem } from '../../interfaces/sidebar.interface';

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

  isLeftNavOpen = signal<boolean>(true);

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
      isActive: true
    },

    {
      icon: this.faBookmark,
      label: 'Kölcsönzés',
      route: '/loan',
      isActive: true
    },

    {
      icon: this.faUsers,
      label: 'Rólunk',
      route: '/about_us',
      isActive: true
    },
  ];
}
