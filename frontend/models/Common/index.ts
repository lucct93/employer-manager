import { ReactNode } from 'react';
export interface PaginationParams {
	_limit: number;
	_page: number;
	_total: number;
}
export interface PaginationProps<T> {
	page: T;
	limit: T;
}
export interface LayoutProps {
	children: ReactNode;
}
export interface ListProps<T> {
	key: T;
	value: T;
}
export interface ListResponse {
	data: any;
	errors: string;
	message: string;
	status: number;
}
export interface ListResponseOTP {
	message: string;
	statusCode: number;
}
export interface ListParams {
	_page: number;
	_limit: number;
	_sort: string;
	_order: 'asc' | 'desc';
	[key: string]: any;
}
