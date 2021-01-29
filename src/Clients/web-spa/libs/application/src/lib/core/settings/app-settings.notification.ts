import { AppSettings } from '@wlodzimierz/application/src/lib/core/settings/app-settings.model';

export interface AppSettingsNotification {
  onSettingsSuccess(settings: AppSettings);
}
