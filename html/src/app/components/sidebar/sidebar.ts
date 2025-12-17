import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook,faBookOpen,faHome,faBookmark,faUsers,faArrowLeft,faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

interface SidebarItem 
{
    icon: any;
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

  icon = {
    faBook,faBookOpen,faHome,faBookmark,faUsers,faArrowLeft,faArrowRightToBracket
  }

  isLeftNavOpen = signal<boolean>(true);
  constructor(private router: Router) {}
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

  login: SidebarItem = {
    icon: this.icon.faArrowRightToBracket,
    label: 'Bejelentkezés',
    route: '/login',
    isActive: false
  };

  activeRoute(item: SidebarItem, index: number): void { 
    this.navItems.forEach((navItem, i) => { 
      navItem.isActive = i === index; }); 

    this.login.isActive = item === this.login; 

    this.router.navigateByUrl(item.route); }
}
