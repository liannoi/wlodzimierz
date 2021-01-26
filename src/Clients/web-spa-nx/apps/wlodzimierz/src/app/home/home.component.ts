import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private title: Title) {
    title.setTitle('Wlodzimierz');
  }
}
