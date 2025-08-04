import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  input,
} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthServiceService } from '../../core/services/Auth/auth-service.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = input<boolean>(false);
  constructor(
    private flowbiteService: FlowbiteService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }
  @ViewChild('Navbar') navbar!: ElementRef;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const element = this.navbar.nativeElement;
    if (window.scrollY > 250) {
      element.classList.add(
        'fixed',
        'top-0',
        'py-2',
        'z-50',
        'w-full',
        'shadow-md'
      );
    } else {
      element.classList.remove('fixed', 'top-0', 'py-2', 'w-full', 'shadow-md');
    }
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }
}
