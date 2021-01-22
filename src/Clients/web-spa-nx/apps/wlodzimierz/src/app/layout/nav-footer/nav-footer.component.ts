import { Component } from '@angular/core';

import { HomeRouting } from '../../home/home.routing';
import { DocsRouting } from '../../docs/docs.routing';

@Component({
  selector: 'wlodzimierz-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss']
})
export class NavFooterComponent {

  public homeRouting = HomeRouting;
  public docsRouting = DocsRouting;
}
