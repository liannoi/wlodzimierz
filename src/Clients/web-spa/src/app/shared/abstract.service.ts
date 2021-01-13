import {HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';

import {OnDispose} from './on-dispose.interface';

export abstract class AbstractService implements OnDispose {

  public abstract onDispose(): void;

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);

    return throwError(error);
  }
}
