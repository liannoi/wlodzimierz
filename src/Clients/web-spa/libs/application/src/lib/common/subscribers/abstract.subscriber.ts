import { BehaviorSubject, Subscription } from 'rxjs';

import { Subscriber } from './subscriber.interface';

export abstract class AbstractSubscriber<TModel> implements Subscriber<TModel> {
  private subscriptions: Subscription[] = [];

  protected constructor(private subject: BehaviorSubject<TModel>) {
  }

  public get model(): TModel {
    return this.subject.getValue();
  }

  public set model(value: TModel) {
    this.publish(value);
  }

  public onDispose(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  public follow(next: (model: TModel) => void): void {
    this.subscriptions.push(this.subject.subscribe(next));
  }

  public publish(model: TModel): void {
    this.subject.next(model);
  }
}
