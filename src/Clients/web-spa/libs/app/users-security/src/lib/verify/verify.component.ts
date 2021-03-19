import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wlodzimierz-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  public qrCode = ' ';

  public constructor(private titleService: Title) {
    this.titleService.setTitle('Enable two-factor authentication');
  }
}
