import { ProductsService } from '../../core/services/product/products.service';
import { Component, OnInit, Query } from '@angular/core';
import { product, IRoot } from './../../core/interfaces/iproduct';
import { ProductListComponent } from '../../shared/components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-shope',
  imports: [CommonModule, ProductListComponent, FormsModule],
  templateUrl: './shope.component.html',
  styleUrl: './shope.component.scss',
})
export class ShopeComponent implements OnInit {
  allProducts: product[] = [];
  filteredProducts: product[] = [];
  pageTilte: string = 'All Products';
  searchQuery: string = '';
  noResults = false;

  constructor(
    private protectService: ProductsService,
    private flowbiteService: FlowbiteService
  ) {}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.protectService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data || [];
        this.filteredProducts = this.allProducts;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  sortOrder: 'asc' | 'desc' = 'asc';

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.allProducts.sort((a, b) =>
      this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
  }

  sortProducts(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const criteria = selectElement.value;
    switch (criteria) {
      case 'price-asc':
        this.allProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.allProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        this.allProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'name-desc':
        this.allProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
  }

  filterProductsByName(): void {
    const query = this.searchQuery?.trim().toLowerCase() || '';

    if (!query) {
      this.allProducts = [...this.filteredProducts];
      this.noResults = false;
      return;
    }

    this.allProducts = this.allProducts.filter((product) =>
      product.title?.toLowerCase().includes(query)
    );

    this.noResults = this.allProducts.length === 0;
  }
}
