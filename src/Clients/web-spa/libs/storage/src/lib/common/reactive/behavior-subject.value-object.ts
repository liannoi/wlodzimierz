import { Subscription } from 'rxjs';

import { OnDispose } from '../interfaces/on-dispose.interface';
import { BehaviorSubjectItem } from './behavior-subject.item';

export class BehaviorSubjectValueObject<TItem> implements OnDispose {
  private readonly item: BehaviorSubjectItem<TItem>;
  private readonly subscriptions: Subscription[] = [];

  public constructor(initialValue: TItem) {
    this.item = new BehaviorSubjectItem<TItem>(initialValue);
  }

  public onDispose(): void {
    this.subscriptions?.forEach(e => e.unsubscribe());
  }

  public emit(value: TItem): boolean {
    this.item.value = value;

    return true;
  }

  public follow(action: (value: TItem) => void): void {
    this.subscriptions.push(this.item.value$.subscribe(action));
  }
}
