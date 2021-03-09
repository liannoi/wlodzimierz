import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle(`Page Not Found - Wlodzimierz`);
  }
}
