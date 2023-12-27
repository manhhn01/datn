export class QueryDto {
  sortBy: string;
  sortDirection?: 'asc' | 'desc';
}

export class PaginateQueryDto extends QueryDto {
  skip?: number;

  take?: number;
}
