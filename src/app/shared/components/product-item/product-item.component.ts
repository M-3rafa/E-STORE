import { CartService } from './../../../core/services/product/cart.service';
import { RouterLink } from '@angular/router';
import { product } from './../../../core/interfaces/iproduct';
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  item = input<product>();
  constructor(
    private CartService: CartService,
    private toastr: ToastrService
  ) {}

  getStars(): string[] {
    const rate = this.item()?.ratingsAverage ?? 0;
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    return [
      ...Array(full).fill('full'),
      ...Array(half).fill('half'),
      ...Array(empty).fill('empty'),
    ];
  }

  addToWishlist(item: product) {
    // Logic to add the item to the wishlist
  }
  addToCart(item: product) {
    this.CartService.addProductCart(item._id).subscribe({
      next: (res) => {
        this.toastr.success(`Added "${item.title}" to cart`, 'Success', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right',
        });
      },
      error: (err) => {
        this.toastr.error('Could not add product to cart.', 'Error', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-right',
        });
      },
    });
  }
}
