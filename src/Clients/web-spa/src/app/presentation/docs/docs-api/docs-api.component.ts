import {Component} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-docs-api',
  templateUrl: './docs-api.component.html',
  styleUrls: ['./docs-api.component.scss']
})
export class DocsApiComponent {

  public environment = environment;

  constructor(private titleService: Title) {
    titleService.setTitle('Wlodzimierz API');
  }
}
