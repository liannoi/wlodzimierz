import {Component, Inject} from '@angular/core';

import {AuthRoutingConstants} from '../../auth/auth-routing.constants';
import {DocsRoutingConstants} from '../../docs/docs-routing.constants';
import {HomeRoutingConstants} from '../../home/home-routing.constants';
import {AuthFacadeImpl} from '../../../infrastructure/storage/users/auth.facade';
import {AuthFacade} from '../../../application/storage/users/auth.facade';
import {ChatRoutingConstants} from '../../chat/chat-routing.constants';

@Component({
  selector: 'app-nav-top-menu',
  templateUrl: './nav-top-menu.component.html',
  styleUrls: ['./nav-top-menu.component.scss']
})
export class NavTopMenuComponent {

  public isExpanded = true;

  public auth = AuthRoutingConstants;
  public docs = DocsRoutingConstants;
  public home = HomeRoutingConstants;
  public chat = ChatRoutingConstants;

  public constructor(@Inject(AuthFacadeImpl) private authFacade: AuthFacade) {
  }

  public isTokenVerified(): boolean {
    return this.authFacade.checkToken();
  }
}
