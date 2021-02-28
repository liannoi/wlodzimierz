import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactComponent } from './contact/contact.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAppcontacts from './+state/contacts.reducer';
import { AppcontactsEffects } from './+state/contacts.effects';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    StoreModule.forFeature(
      fromAppcontacts.APP / CONTACTS_FEATURE_KEY,
      fromAppcontacts.reducer
    ),
    EffectsModule.forFeature([AppcontactsEffects]),
  ],
  declarations: [ContactListComponent, ContactComponent],
})
export class ContactsModule {}
