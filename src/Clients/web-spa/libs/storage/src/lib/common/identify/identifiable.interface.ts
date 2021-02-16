export interface Identifiable<TModel, TResult> {
  identify(index: number, model: TModel): TResult;
}
