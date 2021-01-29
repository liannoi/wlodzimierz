import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, takeUntil } from 'rxjs/operators';

import { AppSettingsService } from '@wlodzimierz/application/src/lib/core/settings/app-settings.service';
import { AppSettings } from '@wlodzimierz/application/src/lib/core/settings/app-settings.model';
import { AbstractService } from '@wlodzimierz/infrastructure/src/lib/common/abstract.service';
import { AppSettingsNotification } from '@wlodzimierz/application/src/lib/core/settings/app-settings.notification';
import { AppSettingsQuery } from '@wlodzimierz/application/src/lib/core/settings/app-settings.query';

@Injectable()
export class AppSettingsServiceImpl extends AbstractService implements AppSettingsService {
  public constructor(http: HttpClient) {
    super(http);
  }

  public getAll(request: AppSettingsQuery, notification: AppSettingsNotification): void {
    this.http
      .get(request.location)
      .pipe(catchError(this.handleError), takeUntil(this.subject))
      .subscribe((result: AppSettings) => notification.onSettingsSuccess(result));
  }
}
