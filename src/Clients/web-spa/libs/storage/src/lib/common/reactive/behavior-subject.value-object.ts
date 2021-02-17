import { Subscription } from 'rxjs';

import { BehaviorSubjectItem } from './behavior-subject.item';
import { Disposable } from './disposable.interface';

export class BehaviorSubjectValueObject<TItem> implements Disposable {
  private readonly item: BehaviorSubjectItem<TItem>;
  private readonly subscriptions: Subscription[] = [];

  public constructor(initialValue: TItem) {
    this.item = new BehaviorSubjectItem<TItem>(initialValue);
  }

  public onDispose(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  public emit(value: TItem): boolean {
    this.item.value = value;

    return true;
  }

  public follow(action: (value: TItem) => void): void {
    this.subscriptions.push(this.item.value$.subscribe(action));
  }
}
