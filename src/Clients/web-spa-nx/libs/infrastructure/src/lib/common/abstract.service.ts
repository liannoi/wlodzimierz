import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';

import { OnDispose } from '@wlodzimierz/data/src/lib/common/on-dispose.interface';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

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

  protected withAuthorization(token: JwtTokenModel): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token.value}` }) };
  }
}
