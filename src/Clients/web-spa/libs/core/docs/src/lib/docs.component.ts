import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Wlodzimierz Documentation');
  }
}
