import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
// import { RemixIconModule } from 'angular-remix-icon';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookflow');
}

