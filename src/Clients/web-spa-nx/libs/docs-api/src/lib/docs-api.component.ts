import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-docs-api',
  templateUrl: './docs-api.component.html',
  styleUrls: ['./docs-api.component.scss']
})
export class DocsApiComponent {

  public constructor(@Inject('api_url') public apiUrl: string, private titleService: Title) {
    titleService.setTitle('Wlodzimierz API');
  }
}
