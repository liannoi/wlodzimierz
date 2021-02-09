import { ValidationErrors, ValidatorFn } from '@angular/forms';

import { AuthFormGroup } from '../auth-form/auth-form.model';

export const unauthorizedValidator: ValidatorFn = (formGroup: AuthFormGroup): ValidationErrors | null => {
  const userName = formGroup.select('userName');
  const password = formGroup.select('password');

  return userName.invalid || password.invalid ? { unauthorized: true } : null;
};
