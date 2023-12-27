import { PaginateQueryDto } from 'src/utils/dto';

export class GetJobQueryDto extends PaginateQueryDto {
  keyword?: string;
  location?: string;
}
