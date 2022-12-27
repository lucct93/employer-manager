import { Status } from 'constants/enums/common';
import { Time } from 'constants/time';
import { EmployeeAddProps, EmployeeEditProps } from 'models/Employee/List';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import employee from 'services/Employee';
import { notify } from 'utils/notification';
import { EMPLOYEE_API } from './useEmployee';
const postEmployee = (object: EmployeeAddProps) => {
	return employee.addEmployee(object);
};
const putEmployee = (props: EmployeeEditProps) => {
	return employee.editEmployee(props);
};
export const usePostEmployee = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	return useMutation(postEmployee, {
		onSuccess: (res: any) => {
			const { data, status } = res;
			if (status === Status.SUCCESS_ADD) {
				queryClient.invalidateQueries(EMPLOYEE_API);
				router.back();
				notify(
					'success',
					`Add employee '${data?.firstName} ${data?.lastName}' successfully`,
					Time.NOTIFY
				);
			}
		},
		onError: (error: any) => {
			notify('error', error?.response?.data?.message || 'Error', Time.NOTIFY);
		},
	});
};
export const usePutEmployee = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	return useMutation(putEmployee, {
		onSuccess: (res: any) => {
			const { data, status } = res;
			if (status === Status.SUCCESS) {
				queryClient.invalidateQueries(EMPLOYEE_API);
				router.back();
				notify(
					'success',
					`Edit employee '${data?.firstName} ${data?.lastName}' successfully`,
					Time.NOTIFY
				);
			}
		},
		onError: (error: any) => {
			notify('error', error?.response?.data?.message || 'Error', Time.NOTIFY);
		},
	});
};
