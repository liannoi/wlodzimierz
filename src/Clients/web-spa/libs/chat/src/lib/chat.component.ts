import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { UsersFacade } from '@wlodzimierz/users';
import { ConversationsFacade } from '@wlodzimierz/chat';

import { ConversationsList } from './conversations/shared/models/conversations-list.models';
import { User } from '../../../users/src/lib/shared/models/user.model';

@Component({
  selector: 'wlodzimierz-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public user: User;
  public conversations$: Observable<ConversationsList>;
  private subscriptions: Subscription[] = [];

  public constructor(private usersFacade: UsersFacade, private conversationsFacade: ConversationsFacade) {
  }

  public ngOnInit(): void {
    this.conversations$ = this.conversationsFacade.conversations$;
    this.followUser();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  public followUser() {
    this.subscriptions.push(
      this.usersFacade.currentUser$.subscribe((user: User) => {
        this.user = user;
        this.conversationsFacade.getAll(user);
      })
    );
  }
}
