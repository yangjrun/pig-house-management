export interface BasicPageParams {
  total?: number;
  pageNum: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  records: T[];
  total: number;
}
