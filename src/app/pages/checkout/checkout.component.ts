import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  shippingForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      details: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')],
      ],
      city: ['', Validators.required],
    });
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          console.log('Checkout ID:', id);
        }
      },
      error: (err) => console.error('Error fetching route params:', err),
    });
  }

  onSubmit(): void {
    if (this.shippingForm.valid) {
      const cartId = this.route.snapshot.paramMap.get('id');
      const shippingData = this.shippingForm.value;

      if (cartId) {
        this.paymentService.Checkoutsession(cartId, shippingData).subscribe({
          next: (res) => {
            console.log('Checkout session created:', res);
            window.open(res.session.url, '_blank');
          },
          error: (error) => {
            console.error('Error creating checkout session:', error);
          },
        });
      }
    } else {
      this.shippingForm.markAllAsTouched();
    }
  }
}
