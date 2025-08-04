import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {
  const NgxSpinner = inject(NgxSpinnerService);
  NgxSpinner.show();
  return next(req).pipe(
    finalize(() => {
      NgxSpinner.hide();
    })
  );
};
