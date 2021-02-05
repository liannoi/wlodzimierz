import { Injectable } from '@angular/core';

import { JwtTokenModel } from '../models/jwt-token.model';
import { UserModel } from '../models/user.model';
import { BehaviorSubjectItem } from '../items/behavior-subject.item';

@Injectable()
export class UsersStore {
  public readonly currentUser: BehaviorSubjectItem<UserModel> = new BehaviorSubjectItem<UserModel>(new UserModel());

  public setCurrentUser(value: UserModel) {
    this.currentUser.value = value;
  }

  public signIn(): void {
    console.log(this.currentUser.value);
  }

  public writeToken(token: JwtTokenModel, expires: Date): void {
  }
}
