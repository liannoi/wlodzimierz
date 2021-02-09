import { HttpErrorResponse } from '@angular/common/http';

export class RemoteResult extends HttpErrorResponse {
  private readonly errors: unknown;

  public first(): string {
    return this.errors[''][0];
  }
}
