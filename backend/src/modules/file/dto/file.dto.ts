import { ApiProperty } from '@nestjs/swagger';

export class FileResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'file',
    example: 'http://localhost:3007/api/upload/photo/239023s.jpg',
  })
  url: string;
}
