export class PaginatedResponseDto<T> {
  constructor(items: T[], pageIndex: number, pageSize: number, totalItems: number) {
    this.items = items;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.totalItems = totalItems;

    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.hasPrevPage = this.pageIndex > 1;
    this.hasNextPage = this.pageIndex < this.totalPages;
  }

  items: T[];

  pageIndex: number;

  pageSize: number;

  totalItems: number;

  hasNextPage: boolean;

  hasPrevPage: boolean;

  totalPages: number;
}
