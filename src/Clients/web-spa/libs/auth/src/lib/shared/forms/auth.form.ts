import { AbstractControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export class AuthFormGroup extends FormGroup {
  private hasFirstAttempt = false;
  private identityError: HttpErrorResponse;

  public get hasAttempt(): boolean {
    return this.hasFirstAttempt;
  }

  public get message(): string {
    return this.identityError.message;
  }

  public map<TModel>(model: TModel): TModel {
    model = this.getRawValue() as TModel;

    return model;
  }

  public select(name: string): AbstractControl {
    return this.get(name) as AbstractControl;
  }

  public failure(): void {
    this.hasFirstAttempt = true;
  }

  public identityFailure(error: HttpErrorResponse): void {
    this.hasFirstAttempt = true;
    this.identityError = error;
    this.setErrors({ identity: true });
  }
}
