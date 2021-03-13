import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable, Subscription } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersFacade } from '@wlodzimierz/app/users';

import { ContactsFacade } from '../+state/contacts.facade';
import { ContactsList } from '../shared/models/contacts-list.model';
import { SearchNotification } from '../shared/notifications/search.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersList } from '../../../../users/src/lib/shared/models/users-list.model';
import { CreatedNotification } from '../shared/notifications/created.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Identifiable } from '../../../../../shared/storage/src/lib/common/interfaces/identifiable.interface';
import { Contact } from '../shared/models/contact.model';
import { SelectedNotification } from '../shared/notifications/selected.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ConversationsFacade } from '../../../../conversations/src/lib/+state/conversations.facade';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Conversation } from '../../../../conversations/src/lib/shared/models/conversation.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { defaultModel } from '../../../../../shared/storage/src/lib/common/defaults/model.default';
import { DeletedNotification } from '../shared/notifications/deleted.notification';
import { EditedNotification } from '../shared/notifications/edited.notification';

@Component({
  selector: 'wlodzimierz-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent
  implements OnInit, OnDestroy, Identifiable<Contact, number> {
  public contacts$: Observable<ContactsList>;
  public filterable$: Observable<UsersList>;
  private subscriptions: Subscription[] = [];
  private contactUser: UserModel;
  private ownerUser: UserModel;

  public constructor(
    private titleService: Title,
    private usersFacade: UsersFacade,
    private contactsFacade: ContactsFacade,
    private conversationsFacade: ConversationsFacade
  ) {
    this.titleService.setTitle('Your contacts - Wlodzimierz');
  }

  public ngOnInit(): void {
    this.contacts$ = this.contactsFacade.contacts$;
    this.followUser();
    this.followFilter();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  public onSearch(notification: SearchNotification) {
    console.log(notification);
    this.usersFacade.filter(notification.user);
  }

  public onCreate(notification: CreatedNotification) {
    this.usersFacade.filter(notification.contact.contactUser);
    notification.contact.ownerUser = this.ownerUser;
    notification.contact.contactUser = this.contactUser;
    this.contactsFacade.create(notification.contact);
  }

  public onSelected(notification: SelectedNotification): void {
    const conversation: Conversation = defaultModel();
    conversation.leftUserId = this.ownerUser.userId;
    conversation.rightUserId = notification.contact.contactUserId;
    this.conversationsFacade.create(conversation);
  }

  public identify(index: number, model: Contact): number {
    return model.contactId;
  }

  public onDeleted(notification: DeletedNotification): void {
    this.contactsFacade.delete(notification.contact);
  }

  public onEdited(notification: EditedNotification): void {
    console.log(notification);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followUser(): void {
    this.subscriptions.push(
      this.usersFacade.currentUser$.subscribe((currentUser) => {
        this.ownerUser = currentUser;
        this.contactsFacade.getAll(currentUser);
      })
    );
  }

  private followFilter(): void {
    this.filterable$ = this.usersFacade.filterable$;
    this.subscriptions.push(
      this.filterable$.subscribe((users) => {
        if (!users || !users.items) return;
        this.contactUser = users.items[0];
      })
    );
  }
}
