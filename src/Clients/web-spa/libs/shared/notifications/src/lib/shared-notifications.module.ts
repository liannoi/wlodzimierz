import { NgModule } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedStorageModule } from '@wlodzimierz/shared/storage';

import { SharedNotificationsEndpointBuilder } from './common/builders/notifications-endpoint.builder';
import { SharedNotificationsService } from './services/notifications.service';

@NgModule({
  imports: [SharedStorageModule],
  providers: [SharedNotificationsService, SharedNotificationsEndpointBuilder],
})
export class SharedNotificationsModule {}
