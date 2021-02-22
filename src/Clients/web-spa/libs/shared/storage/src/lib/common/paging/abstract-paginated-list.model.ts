export abstract class AbstractPaginatedList<TModel> {
  protected constructor(
    public items: TModel[] = [],
    public pageIndex: number = 0,
    public totalPages: number = 0,
    public totalCount: number = 0,
    public hasPreviousPage: boolean = false,
    public hasNextPage: boolean = false
  ) {
  }
}
