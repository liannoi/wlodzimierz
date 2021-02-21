import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Wlodzimierz Applications');
  }
}
