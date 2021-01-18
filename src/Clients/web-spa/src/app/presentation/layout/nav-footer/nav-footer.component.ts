import {Component} from '@angular/core';
import {DocsRoutingConstants} from '../../docs/docs-routing.constants';
import {HomeRoutingConstants} from '../../home/home-routing.constants';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss']
})
export class NavFooterComponent {

  public docs = DocsRoutingConstants;
  public home = HomeRoutingConstants;
}
