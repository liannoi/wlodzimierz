import { Injectable } from '@angular/core';

import { BehaviorSubjectItem } from '../items/behavior-subject.item';
import { JwtToken } from '../models/jwt-token.model';
import { User } from '../models/user.model';

@Injectable()
export class UsersStore {
  public readonly currentUser: BehaviorSubjectItem<User> = new BehaviorSubjectItem<User>({
    userId: '',
    firstName: '',
    lastName: '',
    photo: '',
    userName: '',
    email: '',
    shouldRemember: false,
    password: ''
  });

  public setCurrentUser(value: User) {
    this.currentUser.value = value;
  }

  public signIn(): void {
    console.log(this.currentUser.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public writeToken(token: JwtToken, expires: Date): void {
  }
}
