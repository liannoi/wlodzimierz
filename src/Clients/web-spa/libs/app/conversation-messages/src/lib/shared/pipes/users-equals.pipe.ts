import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { UserModel } from '../../../../../../shared/storage/src/lib/users/models/user.model';

@Pipe({ name: 'uequals' })
@Injectable()
export class UsersEqualsPipe implements PipeTransform {
  public transform(first: UserModel, second: UserModel): boolean {
    return first.userId == second.userId;
  }
}
