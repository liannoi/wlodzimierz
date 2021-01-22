import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {

  public constructor(private titleService: Title) {
    titleService.setTitle('Wlodzimierz Applications');
  }
}
