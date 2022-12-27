import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { PaginationInputDto } from '../../../shared/pagination/paginatio-input.dto';
import { EGender, sortParamsExample } from '../../../shared';

export class GetEmployeeResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee First Name',
    example: 'Mohamad',
  })
  uuid: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee First Name',
    example: 'Mohamad',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee Last Name',
    example: 'Alli',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee email',
    example: 'alli.m@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee phone number',
    example: '0122853752',
  })
  phone: string;

  @ApiProperty({
    type: 'enum',
    enum: EGender,
    description: `Gender, values in: ${Object.values(EGender).join(', ')}`,
    example: EGender.male,
  })
  gender: EGender;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee phone number',
    example: 'https://randomuser.me/api/portraits/men/30.jpg',
  })
  photo: string;
}

export class CreateEmployeeDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee First Name',
    example: 'Mohamad',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([a-zA-Z ]){6,10}$/, {
    message: 'Alphabet and 6-10 char is required',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee Last Name',
    example: 'Aallii',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([a-zA-Z]){6,10}$/, {
    message: 'Alphabet and 6-10 char is required',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee email',
    example: 'alli.m@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Employee phone number',
    example: '0122853752',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    type: 'enum',
    enum: EGender,
    description: `Gender, values in: ${Object.values(EGender).join(', ')}`,
    example: EGender.male,
  })
  @IsEnum(EGender)
  @IsNotEmpty()
  gender: EGender;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee photo',
    example: 'https://randomuser.me/api/portraits/men/30.jpg',
  })
  @IsString()
  @IsOptional()
  photo: string;
}

export class UpdateEmployeeDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee First Name',
    example: 'Mohamad',
  })
  @IsString()
  @IsOptional()
  @Matches(/^([a-zA-Z ]){6,10}$/, {
    message: 'Alphabet and 6-10 char is required',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee Last Name',
    example: 'Aallii',
  })
  @IsString()
  @IsOptional()
  @Matches(/^([a-zA-Z]){6,10}$/, {
    message: 'Alphabet and 6-10 char is required',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee email',
    example: 'alli.m@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee phone number',
    example: '0122853752',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    type: 'enum',
    enum: EGender,
    description: `Gender, values in: ${Object.values(EGender).join(', ')}`,
    example: EGender.male,
    required: false,
  })
  @IsEnum(EGender)
  @IsOptional()
  gender: EGender;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee photo',
    example: 'https://randomuser.me/api/portraits/men/30.jpg',
  })
  @IsString()
  @IsOptional()
  photo: string;
}

export class GetEmployeeListInputDto extends PaginationInputDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee First Name',
    example: 'Mohamad',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee Last Name',
    example: 'Aallii',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee email',
    example: 'alli.m@gmail.com',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Employee phone number',
    example: '0122853752',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    type: 'enum',
    enum: EGender,
    description: `Gender, values in: ${Object.values(EGender).join(', ')}`,
    example: EGender.male,
    required: false,
  })
  @IsEnum(EGender)
  @IsOptional()
  gender?: EGender;

  @ApiProperty({
    type: 'json',
    required: false,
    name: 'sort',
    example: sortParamsExample,
  })
  @IsOptional()
  @IsJSON()
  sort?: any;
}
