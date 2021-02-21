import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RouterStateSerializer } from '@ngrx/router-store';

import { Url } from '@wlodzimierz/ngrx-router';

@Injectable()
export class CustomSerializer implements RouterStateSerializer<Url> {
  public serialize(snapshot: RouterStateSnapshot): Url {
    const { url } = snapshot;
    const { queryParams } = snapshot.root;

    let state: ActivatedRouteSnapshot = snapshot.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    return { url, queryParams, params };
  }
}
