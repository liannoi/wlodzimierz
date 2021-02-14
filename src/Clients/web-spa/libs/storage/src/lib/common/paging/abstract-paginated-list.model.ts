export interface AbstractPaginatedList<TModel> {
  items: TModel;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
