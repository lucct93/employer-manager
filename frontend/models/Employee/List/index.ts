import { GENDER } from 'constants/enums/common';

export interface EmployeeFilterProps {
	key?: React.Key;
	firstName: string;
	lastName: string;
	emailAddress: string;
	phoneNumber: string;
	gender: string;
}
export interface GetAllEmployeeProps {
	pageIndex: number;
	pageSize: number;
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	gender?: string;
}
export interface EmployeeProps {
	createdAt: string;
	updatedAt: string;
	uuid: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	gender: GENDER.FEMALE | GENDER.MALE;
	photo?: string;
}
export interface ResponProps {
	items: EmployeeProps[];
	pageSize: number;
	pageIndex: number;
	totalItems: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
}
export interface EmployeeSSRProps {
	data: ResponProps;
}
export interface SearchProps {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	gender: string;
}
export interface Gender {
	F: string;
	M: string;
}
export interface EmployeeAddProps {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	gender: GENDER.FEMALE | GENDER.MALE;
}
export interface EmployeeEditProps {
	id: string;
	object: EmployeeAddProps;
}
