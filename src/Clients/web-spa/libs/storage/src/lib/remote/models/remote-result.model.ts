import { HttpErrorResponse } from '@angular/common/http';

export class RemoteResult extends HttpErrorResponse {
  public readonly errors: undefined;
}
