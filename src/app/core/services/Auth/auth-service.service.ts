import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { TokenServiceService } from './token-service.service';
import { iLogin, iRegister } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenServiceService
  ) {}

  register(model: iRegister): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/signup`, model);
  }

  login(model: iLogin): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/auth/signin`, model);
  }

  logout(): void {
    this.tokenService.logout();
  }
}
