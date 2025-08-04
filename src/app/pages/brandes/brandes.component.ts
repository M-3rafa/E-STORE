import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Brand } from '../../core/interfaces/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brandes',
  imports: [CommonModule],
  templateUrl: './brandes.component.html',
  styleUrl: './brandes.component.scss',
})
export class BrandesComponent implements OnInit {
  pageTitle: string = 'Brands';
  brands: Brand[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllBrands().subscribe({
      next: (data) => {
        console.log('All Brands:', data.data);
        this.brands = data.data;
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      },
    });
  }
}
