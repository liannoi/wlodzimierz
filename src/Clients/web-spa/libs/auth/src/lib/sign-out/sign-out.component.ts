import { Component, OnInit } from '@angular/core';

import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'wlodzimierz-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  public constructor(private authFacade: AuthFacade) {
  }

  public ngOnInit(): void {
    this.authFacade.signOut();
  }
}
