import { NgModule } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { StorageModule } from '@wlodzimierz/storage';

import { NotificationsEndpointBuilder } from './common/builders/notifications-endpoint.builder';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  imports: [StorageModule],
  providers: [NotificationsService, NotificationsEndpointBuilder]
})
export class NotificationsModule {
}
