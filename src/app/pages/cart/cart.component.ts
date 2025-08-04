import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/product/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  isLoading: boolean = true;
  cartId: string | null = null;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartId = res.cartId;
        this.cartItems = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to load cart');
        this.isLoading = false;
      },
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) return;

    this.cartService.updateProductCart(productId, quantity).subscribe({
      next: () => {
        this.toastr.success('Quantity updated');
        this.getCart();
      },
      error: () => this.toastr.error('Failed to update quantity'),
    });
  }

  removeProduct(productId: string): void {
    this.cartService.removeProductCart(productId).subscribe({
      next: () => {
        this.toastr.success('Product removed');
        this.getCart();
      },
      error: () => this.toastr.error('Failed to remove product'),
    });
  }

  clearCart(): void {
    this.cartService.clearUserCart().subscribe({
      next: () => {
        this.toastr.success('Cart cleared');
        this.getCart();
      },
      error: () => this.toastr.error('Failed to clear cart'),
    });
  }
}
