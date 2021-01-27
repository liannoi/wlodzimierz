import { Component, Inject, OnDestroy } from '@angular/core';

import { AuthFacadeImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/auth/auth.facade';
import { AuthFacade } from '@wlodzimierz/application/src/lib/storage/users/auth.facade';

import { HomeRouting } from '../../home/home.routing';
import { DocsRouting } from '../../docs/docs.routing';
import { AuthRouting } from '../../auth/auth.routing';
import { ChatRouting } from '../../chat/chat.routing';

@Component({
  selector: 'wlodzimierz-nav-top-menu',
  templateUrl: './nav-top-menu.component.html',
  styleUrls: ['./nav-top-menu.component.scss']
})
export class NavTopMenuComponent implements OnDestroy {

  public isExpanded = true;
  public homeRouting = HomeRouting;
  public docsRouting = DocsRouting;
  public authRouting = AuthRouting;
  public chatRouting = ChatRouting;

  public constructor(@Inject(AuthFacadeImpl) private authFacade: AuthFacade) {
  }

  public ngOnDestroy(): void {
    this.authFacade.onDispose();
  }

  public isTokenVerified(): boolean {
    return this.authFacade.checkToken();
  }
}
