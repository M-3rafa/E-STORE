import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/product/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  pageTitle: string = 'Categories';
  categories: Category[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllcategories().subscribe({
      next: (data) => {
        console.log('All Categories:', data.data);
        this.categories = data.data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }
}
