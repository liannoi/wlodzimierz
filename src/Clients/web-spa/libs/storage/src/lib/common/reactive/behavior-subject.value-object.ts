import { Subscription } from 'rxjs';

import { OnDispose } from '../interfaces/on-dispose.interface';
import { BehaviorSubjectItem } from './behavior-subject.model';

export class BehaviorSubjectValueObject<TItem> implements OnDispose {
  private item: BehaviorSubjectItem<TItem>;
  private subscription: Subscription;

  public constructor(initialValue: TItem) {
    this.item = new BehaviorSubjectItem<TItem>(initialValue);
  }

  public onDispose(): void {
    this.subscription?.unsubscribe();
  }

  public emit(value: TItem): boolean {
    this.item.value = value;

    return true;
  }

  public follow(action: (value: TItem) => void): void {
    this.subscription = this.item.value$.subscribe(action);
  }
}
