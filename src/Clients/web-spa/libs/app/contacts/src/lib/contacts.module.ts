import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactComponent } from './contact/contact.component';
import * as fromContacts from './+state/contacts.reducer';
import { ContactsEffects } from './+state/contacts.effects';
import { ContactsFacade } from './+state/contacts.facade';
import { ContactInitialComponent } from './contact-initial/contact-initial.component';
import { ContactsEndpointBuilder } from './shared/storage/contacts-endpoint.builder';
import { ContactsService } from './shared/storage/contacts.service';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ConversationsModule } from '@wlodzimierz/app/conversations';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    ConversationsModule,
    ContactsRoutingModule,
    StoreModule.forFeature(
      fromContacts.CONTACTS_FEATURE_KEY,
      fromContacts.reducer
    ),
    EffectsModule.forFeature([ContactsEffects]),
  ],
  declarations: [
    ContactListComponent,
    ContactComponent,
    ContactInitialComponent,
    ContactCreateComponent,
  ],
  providers: [ContactsFacade, ContactsEndpointBuilder, ContactsService],
})
export class ContactsModule {}
