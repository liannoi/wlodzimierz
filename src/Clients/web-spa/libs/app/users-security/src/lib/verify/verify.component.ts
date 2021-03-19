import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersFacade } from '@wlodzimierz/app/users';

import { UsersSecurityService } from '../shared/storage/users-security.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
import { Authenticator } from '../shared/models/authenticator.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BehaviorSubjectItem } from '../../../../../shared/storage/src/lib/common/reactive/behavior-subject.item';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defaultModel } from '../../../../../shared/storage/src/lib/common/defaults/model.default';
import { twoFactorFailureValidator } from '../shared/validators/two-factor-failure.validator';

@Component({
  selector: 'wlodzimierz-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit, OnDestroy {
  //public qrCode:BehaviorSubjectItem<string>=new BehaviorSubjectItem<string>(' ');
  public qrCodeForm: FormGroup;
  public currentUser: UserModel;
  public authenticator: BehaviorSubjectItem<Authenticator> = new BehaviorSubjectItem<Authenticator>(
    defaultModel()
  );
  private subscriptions: Subscription[] = [];

  public constructor(
    private titleService: Title,
    private usersFacade: UsersFacade,
    private securityService: UsersSecurityService,
    private router: Router
  ) {
    this.titleService.setTitle('Enable two-factor authentication');
  }

  public get qrCodeInput(): AbstractControl {
    return this.qrCodeForm.get('qrCode');
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.initializeCurrentUser();
    this.setupAuthenticator();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  public onVerify(): void {
    if (this.qrCodeForm.invalid) return;

    const subscription = this.securityService
      .verify(this.currentUser, this.qrCodeInput.value)
      .pipe(
        map(() => {
          this.usersFacade.verify();
          return this.router.navigate(['/settings/security']);
        }),
        catchError(async () => {
          this.qrCodeForm.setErrors({ twoFactorFailure: true });
          this.qrCodeForm.markAsPristine();
          this.qrCodeInput.setValue('');
        })
      )
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe(() => {
      });

    this.subscriptions.push(subscription);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private initializeForm() {
    this.qrCodeForm = new FormGroup(
      {
        qrCode: new FormControl('', [
          Validators.required,
          Validators.maxLength(6)
        ])
      },
      { validators: twoFactorFailureValidator }
    );
  }

  private initializeCurrentUser(): void {
    this.subscriptions.push(
      this.usersFacade.currentUser$.subscribe(
        (user) => (this.currentUser = user)
      )
    );
  }

  private setupAuthenticator(): void {
    this.subscriptions.push(
      this.securityService
        .setup(this.currentUser)
        .subscribe((authenticator) => {
          this.authenticator.value = authenticator;
          //this.qrCode.value = this.authenticator?.authenticatorUri;
        })
    );
  }
}
