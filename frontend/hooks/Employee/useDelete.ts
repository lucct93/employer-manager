import { Status } from 'constants/enums/common';
import { Time } from 'constants/time';
import { useMutation, useQueryClient } from 'react-query';
import employee from 'services/Employee';
import { notify } from 'utils/notification';
import { EMPLOYEE_API } from './useEmployee';
const deleteEmployeeRequest = (id: string) => {
	return employee.deleteEmployeeByID(id);
};
export const useDeleteEmployeeRequest = (afterSuccess?: Function) => {
	const queryClient = useQueryClient();
	return useMutation(deleteEmployeeRequest, {
		onSuccess: (res: any) => {
			const { data, status } = res;
			if (status === Status.SUCCESS) {
				queryClient.invalidateQueries(EMPLOYEE_API);
				notify(
					'success',
					`Delete employee '${data?.firstName} ${data?.lastName}' successfully`,
					Time.NOTIFY
				);
			}
			afterSuccess?.();
		},
		onError: (error: any) => {
			notify('error', error?.response?.data?.message || 'Error', Time.NOTIFY);
		},
	});
};
