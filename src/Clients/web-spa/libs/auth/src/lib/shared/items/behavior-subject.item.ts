import { BehaviorSubject, Observable } from 'rxjs';

export class BehaviorSubjectItem<T> {
  public readonly value$: Observable<T>;
  private readonly subject: BehaviorSubject<T>;

  public constructor(initialValue: T) {
    this.subject = new BehaviorSubject(initialValue);
    this.value$ = this.subject.asObservable();
  }

  get value(): T {
    return this.subject.getValue();
  }

  set value(value: T) {
    this.subject.next(value);
  }
}
