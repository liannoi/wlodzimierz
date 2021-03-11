import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NgrxErrorFacade } from '@wlodzimierz/ngrx/ngrx-error';

@Injectable()
export class NgrxErrorInterceptorService implements HttpInterceptor {
  public constructor(private facade: NgrxErrorFacade) {
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 500:
              this.facade.throw500Error(error);
              break;
          }
        }

        return throwError(error);
      })
    );
  }
}
