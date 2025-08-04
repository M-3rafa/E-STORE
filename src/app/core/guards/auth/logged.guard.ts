import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenServiceService } from '../../services/Auth/token-service.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  let _navigate = inject(Router);
  let _isLoggedIn = inject(TokenServiceService);
  if (_isLoggedIn.isLoggedIn()) {
    _navigate.navigate(['/home']);
    return false;
  }

  return true;
};
