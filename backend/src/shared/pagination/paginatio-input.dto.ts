import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export abstract class PaginationInputDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  pageIndex?: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  pageSize?: number;

  get skip(): number {
    return ((this.pageIndex as number) - 1) * (this.pageSize as number);
  }
}
