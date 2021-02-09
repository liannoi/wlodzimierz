import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs';

import { BehaviorSubjectItem } from '../items/behavior-subject.item';

@Injectable()
export class AuthFormService {
  private isFormFailure: BehaviorSubjectItem<boolean> = new BehaviorSubjectItem<boolean>(false);
  private subscription: Subscription;

  public onDispose(): void {
    this.subscription.unsubscribe();
  }

  public follow(action: (value: boolean) => void): void {
    this.subscription = this.isFormFailure.value$.subscribe(action);
  }

  public failure(): boolean {
    this.isFormFailure.value = true;

    return true;
  }
}
