import { Component } from '@angular/core';

import { HomeRouting } from '../../home/home.routing';
import { DocsRouting } from '../../docs/docs.routing';
import { AuthRouting } from '../../auth/auth.routing';

@Component({
  selector: 'wlodzimierz-nav-top-menu',
  templateUrl: './nav-top-menu.component.html',
  styleUrls: ['./nav-top-menu.component.scss']
})
export class NavTopMenuComponent {

  public isExpanded = true;
  public homeRouting = HomeRouting;
  public docsRouting = DocsRouting;
  public authRouting = AuthRouting;

  public isTokenVerified(): boolean {
    return false;
  }
}
