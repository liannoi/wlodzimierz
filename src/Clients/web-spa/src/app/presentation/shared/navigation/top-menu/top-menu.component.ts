import {Component} from '@angular/core';
import {NavigationRoutingConstants} from '../navigation-routing.constants';

@Component({
  selector: 'app-navigation-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  public isExpanded = true;

  public navigationRoutingConstants = NavigationRoutingConstants;

  public isTokenVerified(): boolean {
    return true;
  }
}
