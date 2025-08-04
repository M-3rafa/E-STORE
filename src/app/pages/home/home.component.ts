import { Component } from '@angular/core';
import { ShopeComponent } from '../shope/shope.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-home',
  imports: [ShopeComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
