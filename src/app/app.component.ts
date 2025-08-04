import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen/loading-screen.component';
@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    LoadingScreenComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce';
}
