import { BehaviorSubject } from 'rxjs';

import { UserModel } from '@wlodzimierz/domain/src/lib/models/user.model';

import { AbstractSubscriber } from '../../../common/subscribers/abstract.subscriber';

export class UserSubscriber extends AbstractSubscriber<UserModel> {
  public constructor() {
    super(new BehaviorSubject<UserModel>(new UserModel()));
  }
}
