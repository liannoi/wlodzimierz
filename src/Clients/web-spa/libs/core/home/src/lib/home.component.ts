import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UsersFacade } from '@wlodzimierz/app/users';

@Component({
  selector: 'wlodzimierz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public constructor(
    private titleService: Title,
    private usersFacade: UsersFacade,
    private router: Router
  ) {
    this.titleService.setTitle('Wlodzimierz');
  }

  public ngOnInit(): void {
    this.initializeCurrentUser();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private initializeCurrentUser(): void {
    this.subscriptions.push();
  }
}
