import { Injectable } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RemoteResult } from '../../../../../../../shared/storage/src/lib/remote/errors/remote-result.model';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Disposable } from '../../../../../../../shared/storage/src/lib/common/interfaces/disposable.interface';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BehaviorSubjectValueObject } from '../../../../../../../shared/storage/src/lib/common/reactive/behavior-subject.value-object';

@Injectable()
export class AuthFormFacade implements Disposable {
  private signInFailure: BehaviorSubjectValueObject<boolean> = new BehaviorSubjectValueObject<boolean>(
    false
  );

  private signUpFailure: BehaviorSubjectValueObject<{
    error: RemoteResult;
    isFailure: boolean;
  }> = new BehaviorSubjectValueObject<{
    error: RemoteResult;
    isFailure: false;
  }>({
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

  public followSignUp(
    action: (value: { error: RemoteResult; isFailure: boolean }) => void
  ): void {
    this.signUpFailure.follow(action);
  }

  public failureSignUp(error: RemoteResult): boolean {
    return this.signUpFailure.emit({ isFailure: true, error });
  }
}
