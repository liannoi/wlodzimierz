import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-docs-root',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent {
  constructor(private titleService: Title) {
    titleService.setTitle('Wlodzimierz Documentation');
  }
}
