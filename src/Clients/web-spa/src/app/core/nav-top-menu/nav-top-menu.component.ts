import {Component} from '@angular/core';

import {ApplicationPaths} from '../../shared/app.constants';

@Component({
  selector: 'app-nav-top-menu',
  templateUrl: './nav-top-menu.component.html',
  styleUrls: ['./nav-top-menu.component.scss']
})
export class NavTopMenuComponent {
  public isExpanded = true;
  public paths = ApplicationPaths;

  public isTokenVerified(): boolean {
    return false;
  }
}
