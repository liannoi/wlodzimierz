import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';

import { OnDispose } from '@wlodzimierz/application/src/lib/common/interfaces/dispose.interface';
import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';

export abstract class AbstractService implements OnDispose {
  protected subject: Subject<void> = new Subject<void>();

  protected constructor(protected http: HttpClient) {
  }

  public onDispose(): void {
    this.subject.next();
    this.subject.complete();
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);

    return throwError(error);
  }

  protected withAuthorization(token: JwtTokenModel): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token.value}` }) };
  }
}
