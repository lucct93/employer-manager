import { MiddlewareConsumer } from '@nestjs/common';
import { NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config';
import { createTypeOrmOptions } from './common/helpers/helper';
import { LoggerMiddleware } from './middlewares';
import { EmployeeModule } from './modules/employee/employee.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', '/upload/photo'),
      serveRoot: `/upload/photo`,
    }),
    TypeOrmModule.forRoot(createTypeOrmOptions('typeorm')),
    EmployeeModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
