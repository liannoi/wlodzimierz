import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent {
  public constructor(private titleService: Title) {
    titleService.setTitle('Wlodzimierz Applications');
  }
}
