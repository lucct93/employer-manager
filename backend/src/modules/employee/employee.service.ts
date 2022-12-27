import { BadRequestException, Logger, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../entities';
import { FindManyOptions, Repository } from 'typeorm';
import * as IMPORTED_EMPLOYERS from '../../../public/employees.json';
import { EGender } from '../../shared';
import {
  CreateEmployeeDto,
  GetEmployeeListInputDto,
  GetEmployeeResponseDto,
  UpdateEmployeeDto,
} from './dto/employee.dto';
import { PaginatedResponseDto } from '../../shared/pagination/paginated-response.dto';
import { removeEmpty } from '../../shared/helpers';
@Injectable()
export class EmployeeService implements OnModuleInit {
  private readonly logger: Logger = new Logger(EmployeeService.name);
  constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>) {}

  async onModuleInit() {
    this.logger.log(`Starting seeding example Employees ${new Date()}`);
    const isInitilized = await this.employeeRepo.count();
    if (isInitilized) {
      this.logger.log(`Finish seeding example Employees ${new Date()}`);
      return;
    }
    const data = IMPORTED_EMPLOYERS.map((e) =>
      this.employeeRepo.create({
        uuid: e?.id,
        firstName: e?.first_name,
        lastName: e?.last_name,
        phone: e?.number,
        email: e?.email,
        gender: e?.gender as EGender,
        photo: e?.photo,
      }),
    );
    await this.employeeRepo.save(data);
    this.logger.log(`Finish seeding example Employees ${new Date()}`);
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<GetEmployeeResponseDto> {
    try {
      const employee = this.employeeRepo.create(createEmployeeDto);
      await this.employeeRepo.save(employee);
      return {
        uuid: employee.uuid,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        gender: employee.gender,
        photo: employee.photo,
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findAll(
    filters: GetEmployeeListInputDto,
  ): Promise<PaginatedResponseDto<GetEmployeeResponseDto>> {
    const defaultSort = filters?.sort ? JSON.parse(filters.sort) : {};
    const { pageIndex, pageSize, skip, firstName, lastName, email, gender, phone } = filters;
    const paramsFilter = removeEmpty(
      {
        firstName,
        lastName,
        email,
        gender,
        phone,
      },
      ['gender'],
    );
    const findManyOptions: FindManyOptions<Employee> = {
      select: [
        'uuid',
        'email',
        'firstName',
        'gender',
        'lastName',
        'phone',
        'photo',
        'createdAt',
        'updatedAt',
      ],
      where: { ...paramsFilter },
      order: defaultSort,
      skip: skip,
      take: pageSize,
    };
    const [employees, count] = await Promise.all([
      this.employeeRepo.find(findManyOptions),
      this.employeeRepo.count(findManyOptions),
    ]);
    return new PaginatedResponseDto<GetEmployeeResponseDto>(employees, pageIndex, pageSize, count);
  }

  async findOne(empUuid: string): Promise<GetEmployeeResponseDto> {
    const employee = await this.employeeRepo.findOne({
      where: {
        uuid: empUuid,
      },
    });
    if (!employee) {
      throw new BadRequestException('Invalid Employee UUID');
    }
    return employee;
  }

  async update(
    empUuid: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<GetEmployeeResponseDto> {
    const employee = await this.employeeRepo.findOne({
      where: {
        uuid: empUuid,
      },
    });
    if (!employee) {
      throw new BadRequestException('Invalid Employee UUID');
    }
    const updatedEmployee = { ...employee, ...updateEmployeeDto };
    await this.employeeRepo.save(updatedEmployee);
    return updatedEmployee;
  }

  async delete(empUuid: string): Promise<Partial<GetEmployeeResponseDto>> {
    const employee = await this.employeeRepo.findOne({
      where: {
        uuid: empUuid,
      },
    });
    if (!employee) {
      throw new BadRequestException('Invalid Employee UUID');
    }
    await this.employeeRepo.delete({ uuid: empUuid });
    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      gender: employee.gender,
      photo: employee.photo,
    };
  }
}
