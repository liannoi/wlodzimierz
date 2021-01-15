import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Observable, Subject, throwError} from 'rxjs';

import {OnDispose} from './on-dispose.interface';

export abstract class AbstractService implements OnDispose {

  protected stop$: Subject<void> = new Subject<void>();

  protected constructor(protected http: HttpClient) {
  }

  public onDispose(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);

    return throwError(error);
  }
}
