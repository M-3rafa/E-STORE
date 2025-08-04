import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { product, IRoot } from '../../interfaces/iproduct';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<IRoot> {
    return this.httpClient.get<IRoot>(`${environment.baseUrl}/api/v1/products`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseUrl}/api/v1/products/${id}`
    );
  }

  getByCategory(category: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.baseUrl}/api/v1/products/categories/${category}`
    );
  }

  getAllBrands(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/brands`);
  }
  getAllcategories(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/categories`);
  }
}
