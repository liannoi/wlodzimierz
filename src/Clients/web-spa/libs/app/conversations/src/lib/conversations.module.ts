import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromConversations from './+state/conversations.reducer';
import { ConversationsEffects } from './+state/conversations.effects';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { InterlocutorPipe } from './shared/pipes/interlocutor.pipe';
import { ConversationsEqualsPipe } from './shared/pipes/conversations-equals.pipe';
import { ConversationsFacade } from './+state/conversations.facade';
import { ConversationsEndpointBuilder } from './shared/storage/conversations-endpoint.builder';
import { ConversationsService } from './shared/storage/conversations.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromConversations.CONVERSATIONS_FEATURE_KEY,
      fromConversations.reducer
    ),
    EffectsModule.forFeature([ConversationsEffects])
  ],
  declarations: [
    ConversationListComponent,
    ConversationComponent,
    ConversationsEqualsPipe,
    InterlocutorPipe
  ],
  providers: [
    ConversationsFacade,
    ConversationsService,
    ConversationsEndpointBuilder
  ],
  exports: [InterlocutorPipe, ConversationListComponent]
})
export class ConversationsModule {
}
