import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable, Subscription } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersFacade } from '@wlodzimierz/app/users';

import { ContactsFacade } from '../+state/contacts.facade';
import { ContactsList } from '../shared/models/contacts-list.model';
import { SearchNotification } from '../shared/notifications/search.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersList } from '../../../../../shared/storage/src/lib/users/models/users-list.model';
import { CreatedNotification } from '../shared/notifications/created.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../../shared/storage/src/lib/users/models/user.model';

@Component({
  selector: 'wlodzimierz-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  public contacts: ContactsList;
  public filterable$: Observable<UsersList>;
  private subscriptions: Subscription[] = [];
  private contactUser: UserModel;
  private ownerUser: UserModel;

  public constructor(
    private titleService: Title,
    private usersFacade: UsersFacade,
    private contactsFacade: ContactsFacade
  ) {
    this.titleService.setTitle('Your contacts - Wlodzimierz');
  }

  public get haveContacts(): boolean {
    return this.contacts?.items?.length > 0;
  }

  public ngOnInit(): void {
    this.followContacts();
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

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private followContacts(): void {
    this.subscriptions.push(
      this.contactsFacade.contacts$.subscribe(
        (contacts) => (this.contacts = contacts)
      )
    );
  }

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
