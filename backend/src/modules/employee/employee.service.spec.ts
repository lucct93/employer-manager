import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { EGender } from '../../shared';
import { Repository } from 'typeorm';
import { createTypeOrmOptions } from '../../common/helpers/helper';
import { Employee } from '../../entities';
import { CreateEmployeeDto, GetEmployeeListInputDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { EmployeeResponseDtoMock, ListEmployeeResponseMock } from './mocks/employee.mock';
import { BadRequestException } from '@nestjs/common';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let employeeRepo: Repository<Employee>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTypeOrmOptions('typeorm')),
        TypeOrmModule.forFeature([Employee]),
      ],
      providers: [EmployeeService],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    employeeRepo = module.get(getRepositoryToken(Employee));
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
    expect(employeeRepo).toBeDefined();
  });

  afterEach(async () => {
    await employeeRepo.delete({});

    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('create', () => {
    it('happy case', async () => {
      // prepare
      const createEmployeeInputDtoMock: CreateEmployeeDto = {
        firstName: 'Nestaa',
        lastName: 'Alexandro',
        email: 'best.nest@gmail.com',
        phone: '1111111111',
        gender: EGender.male,
        photo: 'https://randomuser.me/api/portraits/men/30.jpg',
      };

      // action
      const result = await employeeService.create(createEmployeeInputDtoMock);

      // assert
      expect(result.firstName).toBe(createEmployeeInputDtoMock.firstName);
      expect(result.lastName).toBe(createEmployeeInputDtoMock.lastName);
      expect(result.phone).toBe(createEmployeeInputDtoMock.phone);
      expect(result.phone).toBe(createEmployeeInputDtoMock.phone);
      expect(result.gender).toBe(createEmployeeInputDtoMock.gender);
    });
  });
  describe('update', () => {
    it('happy case', async () => {
      // prepare
      await employeeRepo.save(EmployeeResponseDtoMock);
      const updatedEmployeeUuidMock: string = EmployeeResponseDtoMock.uuid;
      const updatedEmployeeInputDtoMock: CreateEmployeeDto = {
        firstName: 'Andriy 1',
        lastName: 'Shevchenko',
        email: EmployeeResponseDtoMock.email,
        phone: EmployeeResponseDtoMock.phone,
        gender: EmployeeResponseDtoMock.gender,
        photo: EmployeeResponseDtoMock.photo,
      };

      // action
      const result = await employeeService.update(
        updatedEmployeeUuidMock,
        updatedEmployeeInputDtoMock,
      );

      // assert
      expect(result.firstName).toBe(updatedEmployeeInputDtoMock.firstName);
      expect(result.lastName).toBe(updatedEmployeeInputDtoMock.lastName);
      expect(result.phone).toBe(updatedEmployeeInputDtoMock.phone);
      expect(result.phone).toBe(updatedEmployeeInputDtoMock.phone);
      expect(result.gender).toBe(updatedEmployeeInputDtoMock.gender);
    });
    it('invalid employee uuid', async () => {
      // prepare
      await employeeRepo.save(EmployeeResponseDtoMock);
      const updatedEmployeeUuidMock = '0';
      const updatedEmployeeInputDtoMock: CreateEmployeeDto = {
        firstName: 'Andriy 1',
        lastName: 'Shevchenko',
        email: EmployeeResponseDtoMock.email,
        phone: EmployeeResponseDtoMock.phone,
        gender: EmployeeResponseDtoMock.gender,
        photo: EmployeeResponseDtoMock.photo,
      };

      // jest.spyOn(employeeService, 'update').mockImplementation(() => {
      //   throw new BadRequestException();
      // });
      // Action
      try {
        const result = await employeeService.update(
          updatedEmployeeUuidMock,
          updatedEmployeeInputDtoMock,
        );
        expect(result).toThrowError();
      } catch (err) {
        // Assert
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
  describe('findOne', () => {
    it('happy case', async () => {
      // prepare
      await employeeRepo.save(EmployeeResponseDtoMock);
      const updatedEmployeeUuidMock: string = EmployeeResponseDtoMock.uuid;
      // action
      const result = await employeeService.findOne(updatedEmployeeUuidMock);

      // assert
      expect(result.firstName).toBe(EmployeeResponseDtoMock.firstName);
      expect(result.lastName).toBe(EmployeeResponseDtoMock.lastName);
      expect(result.phone).toBe(EmployeeResponseDtoMock.phone);
      expect(result.phone).toBe(EmployeeResponseDtoMock.phone);
      expect(result.gender).toBe(EmployeeResponseDtoMock.gender);
    });
    it('invalid employee uuid', async () => {
      // prepare
      await employeeRepo.save(EmployeeResponseDtoMock);
      const updatedEmployeeUuidMock = '0';

      // jest.spyOn(employeeService, 'findOne').mockImplementation(() => {
      //   throw new BadRequestException();
      // });
      // Action
      try {
        const result = await employeeService.findOne(updatedEmployeeUuidMock);
        expect(result).toThrowError();
      } catch (err) {
        // Assert
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
  describe('delete', () => {
    it('happy case', async () => {
      // prepare
      await employeeRepo.save(EmployeeResponseDtoMock);
      const updatedEmployeeUuidMock: string = EmployeeResponseDtoMock.uuid;
      // action
      const result = await employeeService.delete(updatedEmployeeUuidMock);

      // assert
      expect(result.firstName).toBe(EmployeeResponseDtoMock.firstName);
      expect(result.lastName).toBe(EmployeeResponseDtoMock.lastName);
      expect(result.phone).toBe(EmployeeResponseDtoMock.phone);
      expect(result.phone).toBe(EmployeeResponseDtoMock.phone);
      expect(result.gender).toBe(EmployeeResponseDtoMock.gender);
    });
    it('invalid employee uuid', async () => {
      // prepare
      await employeeRepo.save(EmployeeResponseDtoMock);
      const updatedEmployeeUuidMock = '0';
      // jest.spyOn(employeeService, 'delete').mockImplementation(() => {
      //   throw new BadRequestException();
      // });
      // Action
      try {
        const result = await employeeService.delete(updatedEmployeeUuidMock);
        expect(result).toThrowError();
      } catch (err) {
        // Assert
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
  describe('findAll', () => {
    it('happy case', async () => {
      // prepare
      const filters: GetEmployeeListInputDto = {
        pageIndex: 1,
        pageSize: 20,
        skip: undefined,
      };
      await employeeRepo.save(EmployeeResponseDtoMock);

      // action
      const result = await employeeService.findAll(filters);

      // assert
      expect(result.pageIndex).toBe(ListEmployeeResponseMock.pageIndex);
      expect(result.pageSize).toBe(ListEmployeeResponseMock.pageSize);
      expect(result.items[0].uuid).toBe(ListEmployeeResponseMock.items[0].uuid);
    });
  });
});
