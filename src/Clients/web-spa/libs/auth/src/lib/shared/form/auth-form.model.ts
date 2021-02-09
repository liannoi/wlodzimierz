import { AbstractControl, FormGroup } from '@angular/forms';

export class AuthFormGroup extends FormGroup {
  public errorMessage: string;
  private hasFirstAttempt = false;

  public get hasAttempt(): boolean {
    return this.hasFirstAttempt;
  }

  public map<TModel>(): TModel {
    return this.getRawValue() as TModel;
  }

  public select(name: string): AbstractControl {
    return this.get(name) as AbstractControl;
  }

  public failure(): void {
    this.hasFirstAttempt = true;
  }

  public identityFailure(message: string): void {
    this.hasFirstAttempt = true;
    this.errorMessage = message;
    this.setErrors({ identity: true });
  }
}
