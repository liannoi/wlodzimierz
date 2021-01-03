import {Component} from '@angular/core';

@Component({
  selector: 'app-nav-top-menu',
  templateUrl: './nav-top-menu.component.html',
  styleUrls: ['./nav-top-menu.component.sass']
})
export class NavTopMenuComponent {
  public isExpanded = true;

  public verifiedToken(): boolean {
    return false;
  }
}
