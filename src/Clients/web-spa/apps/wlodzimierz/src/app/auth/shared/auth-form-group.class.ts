import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { JwtTokenModel } from '@wlodzimierz/domain/src/lib/models/jwt-token.model';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';

export class AuthFormGroup extends FormGroup {
  private hasFirstAttempt = false;
  private identityError: HttpErrorResponse;

  public failed(): void {
    this.hasFirstAttempt = true;
  }

  public identityFailed(error: HttpErrorResponse): void {
    this.hasFirstAttempt = true;
    this.identityError = error;
    this.setErrors({ identity: true });
  }

  public check(): boolean {
    return this.hasFirstAttempt;
  }

  public errorMessage(): string {
    return this.identityError.message;
  }

  public writeToken(currentUser: UserModel, authFacade: AuthFacade, token: JwtTokenModel) {
    const date = new Date();
    const minutes = currentUser.shouldRemember ? 15 : 5;
    date.setMinutes(date.getMinutes() + minutes);
    authFacade.writeToken(token, date);
  }
}
