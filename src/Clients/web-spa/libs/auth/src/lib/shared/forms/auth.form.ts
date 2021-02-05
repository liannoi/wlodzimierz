import { AbstractControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { UserModel } from '../models/user.model';
import { JwtTokenModel } from '../models/jwt-token.model';
import { UsersStore } from '../stores/users.store';

export class AuthFormGroup extends FormGroup {
  private hasFirstAttempt = false;
  private identityError: HttpErrorResponse;

  public check(): boolean {
    return this.hasFirstAttempt;
  }

  public errorMessage(): string {
    return this.identityError.message;
  }

  public failed(): void {
    this.hasFirstAttempt = true;
  }

  public model<TModel>() {
    return this.getRawValue() as TModel;
  }

  public control(name: string): AbstractControl {
    return this.get(name) as AbstractControl;
  }

  public identityFailed(error: HttpErrorResponse): void {
    this.hasFirstAttempt = true;
    this.identityError = error;
    this.setErrors({ identity: true });
  }

  public writeToken(currentUser: UserModel, token: JwtTokenModel, usersService: UsersStore) {
    const date = new Date();
    const minutes = currentUser.shouldRemember ? 15 : 5;
    date.setMinutes(date.getMinutes() + minutes);
    usersService.writeToken(token, date);
  }
}
