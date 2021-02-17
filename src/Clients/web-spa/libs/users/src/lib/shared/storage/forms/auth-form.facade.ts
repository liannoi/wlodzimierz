import { Injectable } from '@angular/core';

import { Disposable } from '../../../../../../storage/src/lib/common/reactive/disposable.interface';
import { BehaviorSubjectValueObject } from '../../../../../../storage/src/lib/common/reactive/behavior-subject.value-object';
import { RemoteResult } from '../../../../../../storage/src/lib/remote/models/remote-result.model';

@Injectable()
export class AuthFormFacade implements Disposable {
  private signInFailure: BehaviorSubjectValueObject<boolean> = new BehaviorSubjectValueObject<boolean>(false);

  private signUpFailure: BehaviorSubjectValueObject<{
    error: RemoteResult;
    isFailure: boolean;
  }> = new BehaviorSubjectValueObject<{ error: RemoteResult; isFailure: false }>({
    error: undefined,
    isFailure: false
  });

  public onDispose(): void {
    this.signInFailure.onDispose();
    this.signUpFailure.onDispose();
  }

  public followSignIn(action: (value: boolean) => void): void {
    this.signInFailure.follow(action);
  }

  public failureSignIn(): boolean {
    return this.signInFailure.emit(true);
  }

  public followSignUp(action: (value: { error: RemoteResult; isFailure: boolean }) => void): void {
    this.signUpFailure.follow(action);
  }

  public failureSignUp(error: RemoteResult): boolean {
    return this.signUpFailure.emit({ isFailure: true, error });
  }
}
