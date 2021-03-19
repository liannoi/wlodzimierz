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

import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import { UsersFacade } from '@wlodzimierz/app/users';

import { UsersSecurityService } from '../../../../../app/users-security/src/lib/shared/storage/users-security.service';
import { UserModel } from '../../../../../app/users/src/lib/shared/models/user.model';
import { twoFactorFailureValidator } from '../shared/validators/two-factor-failure.validator';

@Component({
  selector: 'wlodzimierz-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorComponent implements OnInit, OnDestroy {
  public phoneIcon = faMobileAlt;
  public verificationForm: FormGroup;
  public currentUser: UserModel;
  private subscriptions: Subscription[] = [];

  public constructor(
    private titleService: Title,
    private usersFacade: UsersFacade,
    private securityService: UsersSecurityService,
    private router: Router
  ) {
    this.titleService.setTitle('Wlodzimierz');
  }

  public get verificationCode(): AbstractControl {
    return this.verificationForm.get('verificationCode');
  }

  public ngOnInit(): void {
    this.setupForm();
    this.initializeCurrentUser();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  public onVerify(): void {
    if (this.verificationForm.invalid) return;

    this.securityService
      .verify(this.currentUser, this.verificationCode.value)
      .pipe(
        map(() => this.router.navigate(['/'])),
        catchError(async () => {
          this.verificationForm.setErrors({ twoFactorFailure: true });
          this.verificationForm.markAsPristine();
          this.verificationCode.setValue('');
        })
      )
      .subscribe(() => {
      });
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.verificationForm = new FormGroup(
      {
        verificationCode: new FormControl('', [
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
}
