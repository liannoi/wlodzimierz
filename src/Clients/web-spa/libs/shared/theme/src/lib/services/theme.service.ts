import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { Theme } from '../models/theme.model';
import { AbstractCookieService } from '../../../../storage/src/lib/local/abstract-cookie.service';

@Injectable()
export class ThemeService extends AbstractCookieService<Theme> {
  private themes: Theme[];

  public constructor(service: CookieService) {
    super('theme', service);
    this.initialize();
  }

  public indexTheme(index: number): Theme {
    return this.themes.find((e) => e.id == index);
  }

  public update(id: number): Theme {
    const theme = JSON.stringify(this.indexTheme(id));
    this.writeExpires(theme, true);

    return JSON.parse(theme) as Theme;
  }

  public read(): Theme | null {
    try {
      return JSON.parse(this.service.get(this.name));
    } catch (e) {
      return null;
    }
  }

  // Helpers.

  private initialize(): void {
    this.themes = [
      { id: 1, name: 'theme-default-white', hex: '#FFFFFF' },
      { id: 2, name: 'theme-yellow', hex: '#F8C146' },
      { id: 3, name: 'theme-blue', hex: '#157AF6' },
      { id: 4, name: 'theme-default-dark', hex: '#1E2124' },
      { id: 5, name: 'theme-dark-dimmed', hex: '#22262D' },
    ];
  }
}
