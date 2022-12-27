import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer } from '@nestjs/common';
import { NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config';
import { createTypeOrmOptions } from './common/helpers/helper';
import { LoggerMiddleware } from './middlewares';
import { EmployeeModule } from './modules/employee/employee.module';
import { AppModule } from './app.module';

jest.mock('@nestjs/typeorm', () => ({
  TypeOrmModule: {
    forRoot: jest.fn(),
  },
}));

jest.mock('./common/helpers/helper', () => ({
  createTypeOrmOptions: jest.fn(),
}));

jest.mock('./middlewares', () => ({
  LoggerMiddleware: {},
}));

jest.mock('./modules/employee/employee.module', () => ({
  EmployeeModule: {},
}));

describe('AppModule', () => {
  it('should create an instance of AppModule', () => {
    const appModule = new AppModule();
    expect(appModule).toBeInstanceOf(AppModule);
  });

  it('should apply the LoggerMiddleware for all routes', () => {
    const consumer = {
      apply: jest.fn().mockReturnThis(),
      forRoutes: jest.fn(),
    };
    const appModule = new AppModule();
    appModule.configure(consumer);

    expect(consumer.apply).toHaveBeenCalledWith(LoggerMiddleware);
    expect(consumer.forRoutes).toHaveBeenCalledWith('*');
  });
});
