import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const twoFactorFailureValidator: ValidatorFn = (
  formGroup: FormGroup
): ValidationErrors | null => {
  const verificationCode = formGroup.get('verificationCode');

  return verificationCode.invalid ? { twoFactorFailure: true } : null;
};
