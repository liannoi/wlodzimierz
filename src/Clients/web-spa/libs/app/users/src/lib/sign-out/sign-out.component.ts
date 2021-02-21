import { Component, OnInit } from '@angular/core';

import { UsersFacade } from '@wlodzimierz/users';

@Component({
  selector: 'wlodzimierz-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  public constructor(private usersFacade: UsersFacade) {
  }

  public ngOnInit(): void {
    this.usersFacade.signOut();
  }
}
