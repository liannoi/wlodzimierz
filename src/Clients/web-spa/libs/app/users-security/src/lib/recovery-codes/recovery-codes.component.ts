import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { faCopy, faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'wlodzimierz-recovery-codes',
  templateUrl: './recovery-codes.component.html',
  styleUrls: ['./recovery-codes.component.scss'],
})
export class RecoveryCodesComponent {
  public downloadIcon = faDownload;
  public printIcon = faPrint;
  public copyIcon = faCopy;

  public constructor(private titleService: Title) {
    this.titleService.setTitle('Enable two-factor authentication');
  }
}
