import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addProductCart(productId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/cart`, { productId });
  }
  updateProductCart(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/v1/cart/${productId}`, {
      count: `${quantity}`,
    });
  }
  getCart(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/cart`);
  }
  removeProductCart(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/cart/${productId}`);
  }
  clearUserCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
