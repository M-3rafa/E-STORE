import { HttpInterceptorFn } from '@angular/common/http';
import { TokenServiceService } from '../../services/Auth/token-service.service';
import { inject } from '@angular/core';
import { url } from 'inspector';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenServiceService);
  const token = tokenService.getToken();

  if (token) {
    if (req.url.includes('cart') || req.url.includes('orders')) {
      req = req.clone({
        setHeaders: {
          token: ` ${token}`,
        },
      });
    }
    return next(req);
  }

  return next(req);
};
