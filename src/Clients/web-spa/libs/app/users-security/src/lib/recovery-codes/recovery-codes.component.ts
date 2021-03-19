import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  Title
} from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { faCopy, faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';

import { UsersFacade } from '@wlodzimierz/app/users';

import { UsersSecurityService } from '../shared/storage/users-security.service';
import { RecoveryCodesList } from '../shared/models/recovery-codes-list.model';
import { UserModel } from '../../../../users/src/lib/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'wlodzimierz-recovery-codes',
  templateUrl: './recovery-codes.component.html',
  styleUrls: ['./recovery-codes.component.scss']
})
export class RecoveryCodesComponent implements OnInit, OnDestroy {
  public downloadIcon = faDownload;
  public printIcon = faPrint;
  public copyIcon = faCopy;
  public recoveryCodes: RecoveryCodesList;
  public fileUrl: SafeResourceUrl;
  public currentUser: UserModel;
  public isDownloaded = false;
  private subscriptions: Subscription[] = [];

  public constructor(
    private titleService: Title,
    private usersFacade: UsersFacade,
    private securityService: UsersSecurityService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.titleService.setTitle('Enable two-factor authentication');
  }

  public ngOnInit(): void {
    this.getCurrentUser();
    this.generateCodes();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((e) => e.unsubscribe());
  }

  public initializeFileUrl(): void {
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(
        new Blob([JSON.stringify(this.recoveryCodes)], {
          type: 'application/octet-stream'
        })
      )
    );
    this.isDownloaded = true;
  }

  public onNext(): void {
    if (!this.isDownloaded) return;

    this.router.navigate(['/settings/two_factor_authentication/verify']);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Helpers
  ///////////////////////////////////////////////////////////////////////////

  private getCurrentUser(): void {
    this.subscriptions.push(
      this.usersFacade.currentUser$.subscribe(
        (user) => (this.currentUser = user)
      )
    );
  }

  private generateCodes(): void {
    this.subscriptions.push(
      this.securityService
        .generate(this.currentUser)
        .subscribe((values) => (this.recoveryCodes = values))
    );
  }
}
