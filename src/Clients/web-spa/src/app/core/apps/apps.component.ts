import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  constructor(private titleService: Title) {
    titleService.setTitle('Wlodzimierz Applications');
  }
}
