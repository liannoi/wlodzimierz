import { AbstractControl, FormGroup } from '@angular/forms';

export class AuthFormGroup extends FormGroup {
  public errorMessage: string;

  public map<TModel>(): TModel {
    return this.getRawValue() as TModel;
  }

  public select(name: string): AbstractControl {
    return this.get(name) as AbstractControl;
  }

  public markAsFailure(): void {
    this.setErrors({ unauthorized: true });
    this.markAsPristine();
  }

  public identityFailure(message: string): void {
    this.errorMessage = message;
    this.markAsFailure();
  }
}
