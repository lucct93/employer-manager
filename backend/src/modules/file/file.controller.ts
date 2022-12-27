import { Controller, Post, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileResponseDto } from './dto/file.dto';
import { getConfig } from '../../common/config';
@Controller('file')
@ApiTags('File Uploader')
export class FileController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/photo',
        filename: (req, file, cb) => {
          const filename: string = uuidv4();
          const extension: string = file.originalname;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: FileResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: Error,
  })
  @ApiBody({
    description: 'photo',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `http://${getConfig().get('server.host')}:${getConfig().get(
        'server.port',
      )}/upload/photo/${file.filename}`,
    };
  }
}
