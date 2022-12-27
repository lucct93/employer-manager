import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from 'stream';
import { FileResponseDto } from './dto/file.dto';
import { FileController } from './file.controller';

describe('FileController', () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('upload', () => {
    it('happy case', async () => {
      // prepare
      const mockedFile: Express.Multer.File = {
        buffer: Buffer.from('Image file'),
        mimetype: 'image/png',
        fieldname: 'logo',
        originalname: 'sample.svg',
        encoding: '7bit',
        size: 4182,
        stream: new Readable(),
        destination: '',
        filename: 'sample.svg',
        path: '',
      };
      const mockedReponse: FileResponseDto = {
        url: 'http://localhost:3007/upload/photo/sample.svg',
      };
      // action
      const result = await controller.uploadFile(mockedFile);

      // assert
      expect(result).toEqual(mockedReponse);
    });
  });
});
