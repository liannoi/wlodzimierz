import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { faLock } from '@fortawesome/free-solid-svg-icons';

import { UsersFacade } from '@wlodzimierz/app/users';

import { UsersSecurityService } from '../../../../../app/users-security/src/lib/shared/storage/users-security.service';
import { UserModel } from '../../../../../app/users/src/lib/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'wlodzimierz-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent {
  public currentUser: UserModel;
  public lockIcon = faLock;

  private subscriptions: Subscription[] = [];

  /*public myAngularxQrCode=' ';*/

  public constructor(
    private titleService: Title,
    private router: Router /*, private usersFacade: UsersFacade, private securityService: UsersSecurityService*/
  ) {
    this.titleService.setTitle('Security - Settings');
  }

  /*  public ngOnInit(): void {
 /!*   this.subscriptions.push(this.usersFacade.currentUser$.subscribe(user => {
      this.currentUser = user;
    }));*!/
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  public onEnable(): void {
    this.subscriptions.push(this.securityService.setup(this.currentUser).subscribe(result => {
      console.log(result);
//this.myAngularxQrCode=result.authenticatorUri;
    }));
  }*/
  public onClick(): void {
    this.router.navigate(['settings/two_factor_authentication']);
  }
}
