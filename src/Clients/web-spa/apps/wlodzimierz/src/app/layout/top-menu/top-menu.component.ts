import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UsersFacade } from '@wlodzimierz/users';

import { User } from '../../../../../../libs/users/src/lib/shared/models/user.model';

@Component({
  selector: 'wlodzimierz-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  public isExpanded: boolean;
  public currentUser$: Observable<User> | undefined;

  public constructor(private usersFacade: UsersFacade) {
  }

  public ngOnInit(): void {
    this.isExpanded = true;
    this.currentUser$ = this.usersFacade.currentUser$;
    this.usersFacade.verify();
  }
}
