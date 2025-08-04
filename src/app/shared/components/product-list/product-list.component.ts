import { Component, Input } from '@angular/core';
import { product } from './../../../core/interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() ProdcutList: product[] = [];
}
