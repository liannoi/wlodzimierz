import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';

import { HomeRouting } from '../../home/home.routing';

@Component({
  selector: 'wlodzimierz-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  public constructor(@Inject(AuthFacadeImpl) private authFacade: AuthFacade, private router: Router) {
  }

  public ngOnInit(): void {
    this.authFacade.clearToken();
    this.router.navigate([HomeRouting.Root]);
  }
}
