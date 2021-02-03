import { Component } from '@angular/core';

@Component({
  selector: 'wlodzimierz-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  public isExpanded = true;

  public isTokenVerified(): boolean {
    return true;
  }
}
