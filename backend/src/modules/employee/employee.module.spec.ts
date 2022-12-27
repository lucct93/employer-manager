import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from '../../entities';
import { EmployeeModule } from './employee.module';

jest.mock('@nestjs/typeorm', () => ({
  TypeOrmModule: {
    forFeature: jest.fn(),
  },
}));

jest.mock('./employee.controller', () => ({
  EmployeeController: {},
}));

jest.mock('./employee.service', () => ({
  EmployeeService: {},
}));

jest.mock('../../entities', () => ({
  Employee: {},
}));

describe('EmployeeModule', () => {
  it('should create an instance of EmployeeModule', () => {
    const employeeModule = new EmployeeModule();
    expect(employeeModule).toBeInstanceOf(EmployeeModule);
  });

  it('should import TypeOrmModule with the Employee entity', () => {
    const employeeModule = new EmployeeModule();
    expect(TypeOrmModule.forFeature).toHaveBeenCalledWith([Employee]);
  });
});
