import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/product/products.service';
import { product } from '../../../core/interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  carouslProducts: product[] = [];

  constructor(
    private protectService: ProductsService,
    private flowbiteService: FlowbiteService
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    // this.protectService.getAllProducts().subscribe({
    //   next: (data) => {
    //     this.carouslProducts = data.slice(0, 3);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching products:', err);
    //   },
    // });
  }
}
