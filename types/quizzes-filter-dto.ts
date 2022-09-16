export interface QuizzesFilterDto {
  page: number;
  limit: number;
  orderByPopularity?: boolean;
  filter?: string;
}
