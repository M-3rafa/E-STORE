import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingServiceService } from '../services/loding/loading-service.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingServiceService);
  loadingService.show();

  return next(req).pipe(finalize(() => loadingService.hide()));
};
