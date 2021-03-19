import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const twoFactorFailureValidator: ValidatorFn = (
  formGroup: FormGroup
): ValidationErrors | null => {
  const qrCode = formGroup.get('qrCode');

  return qrCode.invalid ? { twoFactorFailure: true } : null;
};
