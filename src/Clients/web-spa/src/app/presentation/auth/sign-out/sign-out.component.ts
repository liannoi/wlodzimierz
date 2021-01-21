import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthFacadeImpl} from '../../../infrastructure/storage/users/auth.facade';
import {AuthFacade} from '../../../application/storage/users/auth.facade';
import {HomeRoutingConstants} from '../../home/home-routing.constants';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  private home = HomeRoutingConstants;

  public constructor(@Inject(AuthFacadeImpl) private authFacade: AuthFacade, private router: Router) {
  }

  public ngOnInit(): void {
    this.authFacade.clearToken();
    this.router.navigate([this.home.Root]);
  }
}
