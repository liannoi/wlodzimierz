import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { VerifyNotification } from '@wlodzimierz/domain/src/lib/notifications/users/verify.notification';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/services/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/services/auth.facade';
import { VerifyCommand } from '@wlodzimierz/application/src/lib/storage/users/commands/verify.command';

import { AuthRouting } from '../../auth/auth.routing';
import { AppSettingsServiceImpl } from '@wlodzimierz/infrastructure/src/lib/settings/app-settings.service';
import { AppSettingsService } from '@wlodzimierz/application/src/lib/core/settings/app-settings.service';
import { AppSettingsQuery } from '@wlodzimierz/application/src/lib/core/settings/app-settings.query';
import { AppSettings } from '@wlodzimierz/application/src/lib/core/settings/app-settings.model';
import { AppSettingsNotification } from '@wlodzimierz/application/src/lib/core/settings/app-settings.notification';

@Component({
  selector: 'wlodzimierz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, VerifyNotification, AppSettingsNotification {
  public currentUser: UserModel;
  public photo: string;

  public constructor(
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    @Inject(AppSettingsServiceImpl) private settingsService: AppSettingsService,
    private router: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Profile - Wlodzimierz');
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public async ngOnInit() {
    await this.authFacade.verify(new VerifyCommand(this.authFacade.readToken()), this);
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
    this.settingsService.onDispose();
  }

  public onSettingsSuccess(settings: AppSettings): void {
    const baseAddress = settings.api.baseAddress.slice(0, -4);
    this.photo = `${baseAddress}${this.currentUser.photo}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onVerifyFailed(error: HttpErrorResponse): void {
    this.authFacade.clearToken();
    this.router.navigate([AuthRouting.SignIn]);
  }

  public async onVerifySuccess(user: UserModel) {
    this.currentUser = user;
    await this.settingsService.getAll(new AppSettingsQuery(), this);
  }
}
