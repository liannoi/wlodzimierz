import {Component} from '@angular/core';

import {ApplicationPaths} from '../../shared/app.constants';
import {DocsPaths} from '../../docs/shared/docs.constants';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public applicationPaths = ApplicationPaths;
  public docsPaths = DocsPaths;
}
