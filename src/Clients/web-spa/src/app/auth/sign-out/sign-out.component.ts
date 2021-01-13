import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../shared/services/auth.service';
import {ApplicationPaths} from '../../shared/app.constants';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  public constructor(private authService: AuthService, private router: Router) {
  }

  public ngOnInit(): void {
    this.authService.clearToken();
    this.router.navigate([ApplicationPaths.Home]);
  }
}
