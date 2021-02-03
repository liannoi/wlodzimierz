import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';
import { AppSettingsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/common/services/app-settings.service';
import { AppSettingsService } from '@wlodzimierz/application/src/lib/common/settings/app-settings.service';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';
import { AppSettings } from '@wlodzimierz/application/src/lib/common/settings/app-settings.model';
import { AppSettingsQuery } from '@wlodzimierz/application/src/lib/common/settings/app-settings.query';
import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { AppSettingsNotification } from '@wlodzimierz/application/src/lib/common/settings/app-settings.notification';

import { AuthRouting } from '../../auth/auth.routing';

@Component({
  selector: 'wlodzimierz-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.scss']
})
export class SettingsProfileComponent implements OnInit, OnDestroy, VerifyNotification, AppSettingsNotification {
  public currentUser: UserModel;
  public photo: string;
  public group: FormGroup;

  public constructor(
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    @Inject(AppSettingsServiceImpl) private settingsService: AppSettingsService,
    private router: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Your Profile');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Form controls
  ///////////////////////////////////////////////////////////////////////////

  public get firstName(): AbstractControl {
    return this.group.get('firstName') as AbstractControl;
  }

  public get lastName(): AbstractControl {
    return this.group.get('lastName') as AbstractControl;
  }

  public get userName(): AbstractControl {
    return this.group.get('userName') as AbstractControl;
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public async ngOnInit() {
    this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
    await this.setupForm();
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
    this.settingsService.onDispose();
  }

  public onSettingsSuccess(settings: AppSettings): void {
    const baseAddress = settings.api.baseAddress.slice(0, -4);
    this.photo = `${baseAddress}${this.currentUser.photo}`;
  }

  public async onVerifySuccess(user: UserModel) {
    this.currentUser = user;
    await this.settingsService.getAll(new AppSettingsQuery(), this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authFacade.clearToken();
    this.router.navigate([AuthRouting.SignIn]);
  }

  public onSignIn(): void {
    if (this.group.invalid) {
      return;
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
    this.group = new FormGroup({
      firstName: new FormControl(this.currentUser?.firstName, [Validators.required]),
      lastName: new FormControl(this.currentUser?.lastName, [Validators.required]),
      email: new FormControl(this.currentUser?.email, [Validators.required]),
      userName: new FormControl(this.currentUser?.userName, [Validators.required])
    });
  }
}
