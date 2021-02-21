import { NavigationExtras, Params } from '@angular/router';

export interface Url {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface Route {
  path: any[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  query?: object;
  extras?: NavigationExtras;
}
