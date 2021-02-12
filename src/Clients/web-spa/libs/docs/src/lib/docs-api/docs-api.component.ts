import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-docs-api',
  templateUrl: './docs-api.component.html',
  styleUrls: ['./docs-api.component.scss']
})
export class DocsApiComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Wlodzimierz API');
  }
}
