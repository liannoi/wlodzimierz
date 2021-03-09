import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Contact } from '../shared/models/contact.model';

@Component({
  selector: 'wlodzimierz-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() public contact: Contact;

  public get photo(): string {
    return this.contact.photo ? this.contact.photo : 'assets/mock-user.png';
  }
}
