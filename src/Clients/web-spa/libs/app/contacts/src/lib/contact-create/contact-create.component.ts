import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { ContactsFacade } from '@wlodzimierz/app/contacts';

import { CreatedNotification } from '../shared/notifications/created.notification';
import { SearchNotification } from '../shared/notifications/search.notification';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersList } from '../../../../users/src/lib/shared/models/users-list.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersFacade } from '@wlodzimierz/app/users';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';

@Component({
  selector: 'wlodzimierz-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent implements OnInit, OnDestroy {
  public filterable$: Observable<UsersList>;
  private subscriptions: Subscription[] = [];
  private ownerUser: UserModel;
  private contactUser: UserModel;

  public constructor(
    private usersFacade: UsersFacade,
    private contactsFacade: ContactsFacade,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.followUser();
    this.followFilter();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  public onCreate(notification: CreatedNotification) {
    this.usersFacade.filter(notification.contact.contactUser);
    notification.contact.ownerUser = this.ownerUser;
    notification.contact.contactUser = this.contactUser;
    this.contactsFacade.create(notification.contact);
    this.router.navigate(['contacts']);
  }

  public onSearch(notification: SearchNotification) {
    this.usersFacade.filter(notification.user);
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
