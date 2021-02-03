import { Component, Inject, OnInit } from '@angular/core';

import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';
import { UserNameServiceImpl } from '@wlodzimierz/infrastructure/src/lib/storage/users/cookies/username.service';
import { Cookie } from '@wlodzimierz/application/src/lib/common/interfaces/cookie.interface';

import { HomeRouting } from '../../home/home.routing';
import { DocsRouting } from '../../docs/docs.routing';
import { AuthRouting } from '../../auth/auth.routing';
import { ChatRouting } from '../../chat/chat.routing';
import { SettingsRouting } from '../../settings/settings.routing';

@Component({
  selector: 'wlodzimierz-nav-top-menu',
  templateUrl: './nav-top-menu.component.html',
  styleUrls: ['./nav-top-menu.component.scss']
})
export class NavTopMenuComponent implements OnInit {
  public homeRouting = HomeRouting;
  public docsRouting = DocsRouting;
  public authRouting = AuthRouting;
  public chatRouting = ChatRouting;
  public settingsRouting = SettingsRouting;
  public isExpanded = true;
  public userName: string;

  public constructor(@Inject(UserNameServiceImpl) private userNameService: Cookie<UserModel>) {
  }

  public ngOnInit(): void {
    this.userName = this.userNameService.read().userName;
  }
}
