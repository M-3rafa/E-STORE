import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  redirectUrl = window.location.origin;

  constructor(private http: HttpClient) {}
  Checkoutsession(cartId: string, shepingData: object): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${this.redirectUrl}`,
      {
        shippingAddress: shepingData,
      }
    );
  }
}
