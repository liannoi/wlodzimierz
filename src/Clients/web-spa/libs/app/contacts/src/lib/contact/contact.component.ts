import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { Contact } from '../shared/models/contact.model';
import { SelectedNotification } from '../shared/notifications/selected.notification';
import { DeletedNotification } from '../shared/notifications/deleted.notification';

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
  @Output()
  public deleted: EventEmitter<DeletedNotification> = new EventEmitter<DeletedNotification>();
  public trashIcon = faTrashAlt;

  public get photo(): string {
    return this.contact.photo ? this.contact.photo : 'assets/mock-user.png';
  }

  public get name(): string {
    let result = '';

    if (this.contact?.firstName) result += this.contact.firstName + ' ';
    else if (this.contact?.lastName) result += this.contact.lastName;
    else result = this.contact.contactUser.userName;

    return result;
  }

  public onSelected(): void {
    this.selected.emit({ contact: this.contact });
  }

  public onDeleted(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) this.deleted.emit({ contact: this.contact });
    });
  }
}
