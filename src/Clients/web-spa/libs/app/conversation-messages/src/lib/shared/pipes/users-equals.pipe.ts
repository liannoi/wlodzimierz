import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { UserModel } from '../../../../../users/src/lib/shared/models/user.model';

@Pipe({ name: 'uequals' })
@Injectable()
export class UsersEqualsPipe implements PipeTransform {
  public transform(first: UserModel, second: UserModel): boolean {
    return first.userId == second.userId;
  }
}
