// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BehaviorSubjectValueObject } from '../../../../../../shared/storage/src/lib/common/reactive/behavior-subject.value-object';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Disposable } from '../../../../../../shared/storage/src/lib/common/interfaces/disposable.interface';

export class TypeaheadTools implements Disposable {
  private requestValueObject: BehaviorSubjectValueObject<string> = new BehaviorSubjectValueObject<string>(
    ''
  );
  private responseValueObject: BehaviorSubjectValueObject<string[]> = new BehaviorSubjectValueObject<string[]>([]);

  public onDispose(): void {
    this.requestValueObject.onDispose();
    this.responseValueObject.onDispose();
  }

  public followRequest(action: (value: string) => void): void {
    this.requestValueObject.follow(action);
  }

  public request(value: string): void {
    this.requestValueObject.emit(value);
  }

  public followResponse(action: (value: string[]) => void): void {
    this.responseValueObject.follow(action);
  }

  public response(value: string[]): void {
    this.responseValueObject.emit(value);
  }

  public requestUserName(value: string): string[] {
    this.request(value);
    const result = this.responseValueObject.value;

    return result ? result : [];
  }
}
