import {Component} from '@angular/core';

import {ApplicationPaths} from '../../shared/app.constants';
import {AuthenticationPaths} from '../../auth/shared/auth.constants';
import {WebPaths} from '../../web/shared/web.constants';
import {DocsPaths} from '../../docs/shared/docs.constants';
import {AuthService} from '../../auth/core/auth.service';

@Component({
  selector: 'app-nav-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  public applicationPaths = ApplicationPaths;
  public authenticationPaths = AuthenticationPaths;
  public webPaths = WebPaths;
  public docsPaths = DocsPaths;

  public isExpanded = true;

  public constructor(private authService: AuthService) {
  }

  public isTokenVerified(): boolean {
    return this.authService.checkToken();
  }
}
