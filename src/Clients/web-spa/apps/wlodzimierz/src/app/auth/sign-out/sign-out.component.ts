import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';

import { UserNameServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/cookies/username.service';
import { Cookie } from '@wlodzimierz/application/src/lib/common/interfaces/cookie.interface';
import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

import { HomeRouting } from '../../home/home.routing';

@Component({
  selector: 'wlodzimierz-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit, OnDestroy {
  public constructor(
    @Inject(AuthFacadeImpl) private authFacade: AuthFacade,
    @Inject(UserNameServiceImpl) private userNameService: Cookie<UserModel>,
    private router: Router
  ) {
  }

  ///////////////////////////////////////////////////////////////////////////
  // Interface handlers
  ///////////////////////////////////////////////////////////////////////////

  public ngOnInit(): void {
    this.authFacade.clearToken();
    this.userNameService.clear();
    this.router.navigate([HomeRouting.Root]);
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
  }
}
