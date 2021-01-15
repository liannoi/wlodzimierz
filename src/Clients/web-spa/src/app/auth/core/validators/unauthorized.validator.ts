import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

// @ts-ignore
export const unauthorizedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const userName = control.get('username') as AbstractControl;
  const password = control.get('password') as AbstractControl;

  return userName.invalid || password.invalid ? {unauthorized: true} : null;
};
