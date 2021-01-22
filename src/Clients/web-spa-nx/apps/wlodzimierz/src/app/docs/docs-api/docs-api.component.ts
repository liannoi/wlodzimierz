import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ApiAddress } from '../../../../../../libs/infrastructure/src/lib/storage/users/users.endpoints';

@Component({
  selector: 'wlodzimierz-docs-api',
  templateUrl: './docs-api.component.html',
  styleUrls: ['./docs-api.component.scss']
})
export class DocsApiComponent {

  public api: string = ApiAddress;

  public constructor(private titleService: Title) {
    titleService.setTitle('Wlodzimierz API');
  }
}
