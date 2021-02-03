import { OnDispose } from '@wlodzimierz/application/src/lib/common/interfaces/dispose.interface';
import { AppSettingsNotification } from '@wlodzimierz/application/src/lib/common/settings/app-settings.notification';
import { AppSettingsQuery } from '@wlodzimierz/application/src/lib/common/settings/app-settings.query';

export interface AppSettingsService extends OnDispose {
  getAll(request: AppSettingsQuery, notification: AppSettingsNotification): void;
}
