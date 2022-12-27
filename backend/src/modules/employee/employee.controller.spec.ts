import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../entities';
import { createTypeOrmOptions } from '../../common/helpers/helper';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, GetEmployeeListInputDto, UpdateEmployeeDto } from './dto/employee.dto';
import { EmployeeResponseDtoMock, ListEmployeeResponseMock } from './mocks/employee.mock';
import { EGender } from '../../shared';
import { PaginationInputDto } from '../../shared/pagination/paginatio-input.dto';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  const employeeService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTypeOrmOptions('typeorm')),
        TypeOrmModule.forFeature([Employee]),
      ],
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: employeeService,
        },
      ],
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
  });

  it('should be defined', () => {
    expect(employeeController).toBeDefined();
  });
  describe('create', () => {
    it('happy case', async () => {
      // prepare
      const createEmployeeInputDtoMock: CreateEmployeeDto = {
        firstName: EmployeeResponseDtoMock.firstName,
        lastName: EmployeeResponseDtoMock.lastName,
        email: EmployeeResponseDtoMock.email,
        phone: EmployeeResponseDtoMock.phone,
        gender: EmployeeResponseDtoMock.gender,
        photo: EmployeeResponseDtoMock.photo,
      };
      employeeService.create.mockResolvedValueOnce(EmployeeResponseDtoMock);

      // action
      const result = await employeeController.create(createEmployeeInputDtoMock);

      // assert
      expect(result.uuid).toBe(EmployeeResponseDtoMock.uuid);
      expect(result.email).toBe(EmployeeResponseDtoMock.email);
      expect(result.phone).toBe(EmployeeResponseDtoMock.phone);
      expect(result.photo).toBe(EmployeeResponseDtoMock.photo);
    });
  });
  describe('findOne', () => {
    it('happy case', async () => {
      // prepare
      const employeeUuidInputDtoMock: string = EmployeeResponseDtoMock.uuid;
      employeeService.findOne.mockResolvedValueOnce(EmployeeResponseDtoMock);

      // action
      const result = await employeeController.findOne(employeeUuidInputDtoMock);

      // assert
      expect(result.uuid).toBe(employeeUuidInputDtoMock);
      expect(result.email).toBe(EmployeeResponseDtoMock.email);
      expect(result.phone).toBe(EmployeeResponseDtoMock.phone);
    });
  });
  describe('update', () => {
    it('happy case', async () => {
      // prepare
      const employeeUuidInputDtoMock: string = EmployeeResponseDtoMock.uuid;
      const updatedEmployeeInputDtoMock: UpdateEmployeeDto = {
        firstName: 'Alexandro',
        lastName: 'Del piero',
        email: 'del.piero@gmail.com',
        phone: '0192234566',
        gender: EGender.male,
        photo: 'https://randomuser.me/api/portraits/men/30.jpg',
      };
      employeeService.update.mockResolvedValueOnce({
        uuid: employeeUuidInputDtoMock,
        ...updatedEmployeeInputDtoMock,
      });

      // action
      const result = await employeeController.update(
        employeeUuidInputDtoMock,
        updatedEmployeeInputDtoMock,
      );

      // assert
      expect(result.uuid).toBe(employeeUuidInputDtoMock);
      expect(result.email).toBe(updatedEmployeeInputDtoMock.email);
      expect(result.phone).toBe(updatedEmployeeInputDtoMock.phone);
    });
  });
  describe('findOne', () => {
    it('happy case', async () => {
      // prepare
      const employeeUuidInputDtoMock: string = EmployeeResponseDtoMock.uuid;
      employeeService.findOne.mockResolvedValueOnce(EmployeeResponseDtoMock);

      // action
      const result = await employeeController.findOne(employeeUuidInputDtoMock);

      // assert
      expect(result.uuid).toBe(employeeUuidInputDtoMock);
      expect(result.email).toBe(EmployeeResponseDtoMock.email);
      expect(result.phone).toBe(EmployeeResponseDtoMock.phone);
    });
  });
  describe('findAll', () => {
    it('happy case', async () => {
      // prepare
      employeeService.findAll.mockResolvedValueOnce(ListEmployeeResponseMock);
      const paginateRequestDtoMock: PaginationInputDto = {
        pageIndex: 1,
        pageSize: 20,
        skip: undefined,
      };
      // action
      const result = await employeeController.findAll(
        paginateRequestDtoMock as GetEmployeeListInputDto,
      );

      // assert
      expect(result.items.length).toBe(ListEmployeeResponseMock.items.length);
      expect(result.pageIndex).toBe(ListEmployeeResponseMock.pageIndex);
      expect(result.pageSize).toBe(ListEmployeeResponseMock.pageSize);
    });
  });
  describe('delete', () => {
    it('happy case', async () => {
      // prepare
      const employeeUuidInputDtoMock: string = EmployeeResponseDtoMock.uuid;
      employeeService.delete.mockResolvedValueOnce(EmployeeResponseDtoMock);

      // action
      const result = await employeeController.delete(employeeUuidInputDtoMock);

      // assert
      expect(result.uuid).toBe(employeeUuidInputDtoMock);
      expect(result.email).toBe(EmployeeResponseDtoMock.email);
      expect(result.phone).toBe(EmployeeResponseDtoMock.phone);
    });
  });
});
