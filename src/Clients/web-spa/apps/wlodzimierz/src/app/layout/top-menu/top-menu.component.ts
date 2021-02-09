import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { User } from '../../../../../../libs/auth/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AuthFacade } from '../../../../../../libs/auth/src/lib/+state/auth.facade';

@Component({
  selector: 'wlodzimierz-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  public isExpanded = true;
  public currentUser$: Observable<User>;

  public constructor(private authFacade: AuthFacade) {
    this.currentUser$ = this.authFacade.currentUser$;
  }

  public ngOnInit(): void {
    this.authFacade.verify();
  }
}
