import { Component } from '@angular/core';

import { Observable } from 'rxjs';

// TODO: Remove.
interface User {
  userName: string;
}

@Component({
  selector: 'wlodzimierz-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  public isExpanded: boolean;
  public currentUser$: Observable<User> | undefined;

  public constructor() {
    this.isExpanded = true;
  }
}
