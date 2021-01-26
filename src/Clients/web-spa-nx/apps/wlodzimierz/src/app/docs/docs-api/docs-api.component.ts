import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ApiBaseAddress } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/api.endpoint';

@Component({
  selector: 'wlodzimierz-docs-api',
  templateUrl: './docs-api.component.html',
  styleUrls: ['./docs-api.component.scss']
})
export class DocsApiComponent {

  public api = ApiBaseAddress;

  public constructor(private titleService: Title) {
    titleService.setTitle('Wlodzimierz API');
  }
}
