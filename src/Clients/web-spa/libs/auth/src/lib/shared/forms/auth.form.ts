import { AbstractControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user.model';
import { JwtToken } from '../models/jwt-token.model';
import { UsersService } from '../services/users.service';

export class AuthFormGroup extends FormGroup {
  private hasFirstAttempt = false;
  private identityError: HttpErrorResponse;

  public check(): boolean {
    return this.hasFirstAttempt;
  }

  public message(): string {
    return this.identityError.message;
  }

  public map<TModel>(): TModel {
    return this.getRawValue() as TModel;
  }

  public take(name: string): AbstractControl {
    return this.get(name) as AbstractControl;
  }

  public fail(): void {
    this.hasFirstAttempt = true;
  }

  public identityFail(error: HttpErrorResponse): void {
    this.hasFirstAttempt = true;
    this.identityError = error;
    this.setErrors({ identity: true });
  }

  public writeToken(currentUser: User, token: JwtToken, usersService: UsersService) {
    const date = new Date();
    const minutes = currentUser.shouldRemember ? 15 : 5;
    date.setMinutes(date.getMinutes() + minutes);
    usersService.writeToken(token, date);
  }
}
