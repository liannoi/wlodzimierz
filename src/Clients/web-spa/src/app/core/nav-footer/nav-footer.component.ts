import {Component} from '@angular/core';

import {ApplicationPaths} from '../../shared/app.constants';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss']
})
export class NavFooterComponent {
  public paths = ApplicationPaths;
}
