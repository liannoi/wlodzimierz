import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable, of } from 'rxjs';

import { JwtTokenService } from '../storage/services/jwt-token.service';

@Injectable()
export class JwtTokenGuard implements CanActivate {
  public constructor(
    private tokenService: JwtTokenService,
    private router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenService.read().value;
    const tokenIsEmpty = token == '';
    if (!token || tokenIsEmpty) {
      this.router.navigate(['/login']);
    }

    return of(!tokenIsEmpty);
  }
}
