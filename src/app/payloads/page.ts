export class Page<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  numberOfElements: number;
  page: number;
  number: number;
  first: boolean;
  last: boolean;
  content: Array<T> = [];
  pageable: {
    pageSize: number;
    pageNumber: number;
    offset: number
  }
}
