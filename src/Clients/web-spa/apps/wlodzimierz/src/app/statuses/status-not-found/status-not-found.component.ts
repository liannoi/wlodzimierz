import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-status-not-found',
  templateUrl: './status-not-found.component.html',
  styleUrls: ['./status-not-found.component.scss']
})
export class StatusNotFoundComponent {
  public constructor(private titleService: Title) {
    titleService.setTitle(`Page Not Found - Wlodzimierz`);
  }
}
