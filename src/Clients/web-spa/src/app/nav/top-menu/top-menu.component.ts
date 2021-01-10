import {Component} from '@angular/core';

import {ApplicationPaths} from '../../shared/app.constants';
import {AuthenticationPaths} from '../../auth/shared/auth.constants';
import {WebPaths} from '../../web/shared/web.constants';
import {DocsPaths} from '../../docs/shared/docs.constants';

@Component({
  selector: 'app-nav-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  public isExpanded = true;
  public applicationPaths = ApplicationPaths;
  public authenticationPaths = AuthenticationPaths;
  public webPaths = WebPaths;
  public docsPaths = DocsPaths;

  public isTokenVerified(): boolean {
    return false;
  }
}
