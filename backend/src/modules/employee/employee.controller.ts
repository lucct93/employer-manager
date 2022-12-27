import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Put, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import {
  CreateEmployeeDto,
  GetEmployeeListInputDto,
  GetEmployeeResponseDto,
  UpdateEmployeeDto,
} from './dto/employee.dto';
import { PaginatedResponseDto } from '../../shared/pagination/paginated-response.dto';

@Controller('employee')
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: PaginatedResponseDto<GetEmployeeResponseDto>,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: Error,
  })
  async findAll(
    @Query() filters: GetEmployeeListInputDto,
  ): Promise<PaginatedResponseDto<GetEmployeeResponseDto>> {
    return this.employeeService.findAll(filters);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetEmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: Error,
  })
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<GetEmployeeResponseDto> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Put(':empUuid')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetEmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: Error,
  })
  async update(
    @Param('empUuid') empUuid: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<GetEmployeeResponseDto> {
    return this.employeeService.update(empUuid, updateEmployeeDto);
  }

  @Get(':empUuid')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetEmployeeResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: Error,
  })
  async findOne(@Param('empUuid') empUuid: string): Promise<GetEmployeeResponseDto> {
    return this.employeeService.findOne(empUuid);
  }

  @Delete(':empUuid')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: PartialType<GetEmployeeResponseDto>,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
    type: Error,
  })
  async delete(@Param('empUuid') empUuid: string): Promise<Partial<GetEmployeeResponseDto>> {
    return this.employeeService.delete(empUuid);
  }
}
