import { Injectable } from '@angular/core';

import { BehaviorSubjectValueObject } from '../../../../../storage/src/lib/common/reactive/behavior-subject.value-object';
import { OnDispose } from '../../../../../storage/src/lib/common/interfaces/on-dispose.interface';
import { RemoteResult } from '../../../../../storage/src/lib/remote/remote-result.model';

@Injectable()
export class AuthFormFacade implements OnDispose {
  private signInFailure: BehaviorSubjectValueObject<boolean> = new BehaviorSubjectValueObject<boolean>(false);
  private signUpFailure: BehaviorSubjectValueObject<{
    error: RemoteResult;
    isFailure: boolean;
  }> = new BehaviorSubjectValueObject<{ error: RemoteResult; isFailure: false }>({
    isFailure: false,
    error: undefined
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
