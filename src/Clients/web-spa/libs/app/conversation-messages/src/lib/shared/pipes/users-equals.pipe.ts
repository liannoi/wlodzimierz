import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { User } from '../../../../../users/src/lib/shared/models/user.model';

@Pipe({ name: 'uequals' })
@Injectable()
export class AppUsersEqualsPipe implements PipeTransform {
  public transform(first: User, second: User): boolean {
    return first.userId == second.userId;
  }
}
