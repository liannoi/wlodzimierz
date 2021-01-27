import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

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
}
