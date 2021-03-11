import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Contact } from '../shared/models/contact.model';
import { SelectedNotification } from '../shared/notifications/selected.notification';

@Component({
  selector: 'wlodzimierz-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() public contact: Contact;
  @Output()
  public selected: EventEmitter<SelectedNotification> = new EventEmitter<SelectedNotification>();

  public get photo(): string {
    return this.contact.photo ? this.contact.photo : 'assets/mock-user.png';
  }

  public onSelected(): void {
    this.selected.emit({ contact: this.contact });
  }
}
