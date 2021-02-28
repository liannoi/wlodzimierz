import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreatedNotification } from '../shared/notifications/create/created.notification';
import { defaultModel } from '../../../../../shared/storage/src/lib/common/defaults/model.default';
import { Contact } from '../shared/models/contact.model';

@Component({
  selector: 'wlodzimierz-contact-create',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit {
  @Output() public createContact = new EventEmitter<CreatedNotification>();
  public contactModel: Contact = defaultModel();
  public formGroup: FormGroup;

  public ngOnInit(): void {
    this.setupForm();
  }

  public onCreate(): void {
    if (this.formGroup.invalid) return;

    this.createContact.emit({ contact: this.contactModel });
    this.formGroup.reset();
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private setupForm(): void {
// TODO: To
  }
}
