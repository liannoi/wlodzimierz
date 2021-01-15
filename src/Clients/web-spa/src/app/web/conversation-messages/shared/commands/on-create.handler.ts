import {HttpErrorResponse} from '@angular/common/http';

export interface OnCreateHandler {

  onCreateSuccess(id: number): void;

  onCreateFailed(error: HttpErrorResponse): void;
}
