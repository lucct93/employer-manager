import { PaginatedResponseDto } from 'src/shared/pagination/paginated-response.dto';
import { EGender } from '../../../shared';
import { GetEmployeeResponseDto } from '../dto/employee.dto';

export const EmployeeResponseDtoMock: GetEmployeeResponseDto = {
  uuid: '1',
  firstName: 'Andriy',
  lastName: 'Shevchenko',
  phone: '0123456789',
  gender: EGender.female,
  email: 'sheva@gmail.com',
  photo: 'https://randomuser.me/api/portraits/men/30.jpg',
};

export const ListEmployeeResponseMock: PaginatedResponseDto<GetEmployeeResponseDto> = {
  totalItems: 1,
  totalPages: 1,
  pageIndex: 1,
  pageSize: 20,
  items: [EmployeeResponseDtoMock],
  hasNextPage: false,
  hasPrevPage: false,
};
