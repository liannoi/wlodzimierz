import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UsersFacade } from '@wlodzimierz/app/users';

import { User } from '../../../../../../libs/app/users/src/lib/shared/models/user.model';

@Component({
  selector: 'wlodzimierz-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  public isExpanded = true;
  public currentUser$: Observable<User>;

  public constructor(private usersFacade: UsersFacade) {
  }

  public ngOnInit(): void {
    this.currentUser$ = this.usersFacade.currentUser$;
    this.usersFacade.verify();
  }
}
