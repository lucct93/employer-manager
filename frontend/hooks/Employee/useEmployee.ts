import { useQuery } from 'react-query';
import employee from 'services/Employee';
export const EMPLOYEE_API = 'employee-api';
export const useEmployee = ({
	pageSize,
	pageIndex,
	firstName,
	lastName,
	email,
	phone,
	gender,
}: {
	pageSize: number;
	pageIndex: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	gender: string;
}) => {
	return useQuery(
		[],
		() =>
			employee.getAllEmployee({
				pageIndex,
				pageSize,
				firstName,
				lastName,
				email,
				phone,
				gender,
			}),
		{
			keepPreviousData: true,
		}
	);
};
