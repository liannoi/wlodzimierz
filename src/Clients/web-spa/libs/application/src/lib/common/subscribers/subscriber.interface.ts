import { OnDispose } from '@wlodzimierz/application/src/lib/common/interfaces/dispose.interface';

export interface Subscriber<TModel> extends OnDispose {
  follow(next: (model: TModel) => void): void;

  publish(model: TModel): void;
}
