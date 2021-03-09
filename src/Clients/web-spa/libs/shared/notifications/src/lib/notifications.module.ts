import { NgModule } from '@angular/core';

import { StorageModule } from '@wlodzimierz/shared/storage';

import { NotificationsService } from './services/notifications.service';
import { NotificationsEndpointBuilder } from './common/builders/notifications-endpoint.builder';

@NgModule({
  imports: [StorageModule],
  providers: [NotificationsService, NotificationsEndpointBuilder],
})
export class NotificationsModule {}
