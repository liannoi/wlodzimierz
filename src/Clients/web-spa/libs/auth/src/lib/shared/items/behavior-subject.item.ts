import { BehaviorSubject, Observable } from 'rxjs';

export class BehaviorSubjectItem<TModel> {
  public readonly value$: Observable<TModel>;
  private readonly subject: BehaviorSubject<TModel>;

  public constructor(initialValue: TModel) {
    this.subject = new BehaviorSubject(initialValue);
    this.value$ = this.subject.asObservable();
  }

  public get value(): TModel {
    return this.subject.value;
  }

  public set value(value: TModel) {
    this.subject.next(value);
  }
}
