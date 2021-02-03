import { AppSettings } from '@wlodzimierz/application/src/lib/common/settings/app-settings.model';

export interface AppSettingsNotification {
  onSettingsSuccess(settings: AppSettings);
}
