import { BehaviorSubject, Observable } from 'rxjs';

export class BehaviorSubjectItem<TItem> {
  public readonly value$: Observable<TItem>;
  private readonly subject: BehaviorSubject<TItem>;

  public constructor(initialValue: TItem) {
    this.subject = new BehaviorSubject(initialValue);
    this.value$ = this.subject.asObservable();
  }

  get value(): TItem {
    return this.subject.getValue();
  }

  set value(value: TItem) {
    this.subject.next(value);
  }
}
