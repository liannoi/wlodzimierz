import {Component} from '@angular/core';

import {DocsRoutingConstants} from '../../docs/docs-routing.constants';
import {NavigationRoutingConstants} from '../navigation-routing.constants';
import {UsersRoutingConstants} from '../../../users/users-routing.constants';

@Component({
  selector: 'app-navigation-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  public isExpanded = true;

  public navigationRoutingConstants = NavigationRoutingConstants;
  public docsRoutingConstants = DocsRoutingConstants;
  public usersRoutingConstants = UsersRoutingConstants;

  public isTokenVerified(): boolean {
    return true;
  }
}
