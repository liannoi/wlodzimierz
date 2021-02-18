import { NgModule } from '@angular/core';

import { StorageModule } from '@wlodzimierz/storage';

import { NotificationsEndpointBuilder } from './common/builders/notifications-endpoint.builder';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  imports: [StorageModule],
  providers: [NotificationsService, NotificationsEndpointBuilder]
})
export class NotificationsModule {
}
