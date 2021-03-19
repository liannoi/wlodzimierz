import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { faLock } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersFacade } from '@wlodzimierz/app/users';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../app/users/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersSecurityService } from '../../../../../app/users-security/src/lib/shared/storage/users-security.service';

@Component({
  selector: 'wlodzimierz-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit, OnDestroy {
  public lockIcon = faLock;
  public currentUser: UserModel;
  private subscriptions: Subscription[] = [];

  public constructor(
    private titleService: Title,
    private router: Router,
    private usersFacade: UsersFacade,
    private securityService: UsersSecurityService
  ) {
    this.titleService.setTitle('Security - Settings');
  }

  public ngOnInit(): void {
    this.initializeCurrentUser();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  public onStartConfiguration(): void {
    this.router.navigate(['/settings/two_factor_authentication']);
  }

  public onDisableTwoFactor(): void {
    this.subscriptions.push(
      this.securityService.disable(this.currentUser).subscribe(() => {
        this.notify();
        this.usersFacade.verify();
      })
    );
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private initializeCurrentUser(): void {
    this.subscriptions.push(
      this.usersFacade.currentUser$.subscribe(
        (user) => (this.currentUser = user)
      )
    );
  }

  private notify(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Two-factor authentication successfully disabled.',
      showConfirmButton: false,
      timer: 2500
    });
  }
}
