export interface BasePaginatedResponse {
  count: number;
  next: string;
  previous: string;
}

export interface PagePaginatedResponse<T> extends BasePaginatedResponse {
  result: T[];
}
