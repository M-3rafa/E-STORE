import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { product } from '../../core/interfaces/iproduct';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { ProductsService } from '../../core/services/product/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  productId: any;
  product: product | null = null;

  constructor(
    private protectedService: ProductsService,
    private activateRoute: ActivatedRoute,
    private flowbiteService: FlowbiteService
  ) {}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe({
      next: (res) => {
        this.flowbiteService.loadFlowbite((flowbite) => {
          initFlowbite();
        });
        this.productId = res.get('id');
        this.protectedService.getSpecificProduct(this.productId).subscribe({
          next: (data) => {
            this.product = data.data;
            console.log(this.product);
          },
          error: (err) => {
            console.log('Error loading product:', err);
          },
        });
      },
    });
  }
  getStars(): string[] {
    const rate = this.product?.ratingsAverage ?? 0;
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    return [
      ...Array(full).fill('full'),
      ...Array(half).fill('half'),
      ...Array(empty).fill('empty'),
    ];
  }
}
