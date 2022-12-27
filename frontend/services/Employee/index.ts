import axiosClient from 'config/axiosClient';
import { API } from 'constants/enums/Employee';
import {
	EmployeeAddProps,
	EmployeeEditProps,
	GetAllEmployeeProps,
} from 'models/Employee/List';
const employee = {
	getAllEmployee({
		pageIndex,
		pageSize,
		firstName,
		lastName,
		email,
		phone,
		gender,
	}: GetAllEmployeeProps) {
		const url = API.GET_ALL_EMPLOYEE;
		return axiosClient.get(url, {
			params: {
				pageIndex,
				pageSize,
				firstName: firstName || null,
				lastName: lastName || null,
				email: email || null,
				phone: phone || null,
				gender: gender || null,
			}, 
		});
	},
	getEmployeeByID(id: string) {
		const url = `${API.GET_ALL_EMPLOYEE}/${id}`;
		return axiosClient.get(url);
	},
	deleteEmployeeByID(id: string) {
		const url = `${API.GET_ALL_EMPLOYEE}/${id}`;
		return axiosClient.delete(url);
	},
	addEmployee(object: EmployeeAddProps) {
		const url = '/todo/employee';
		return axiosClient.post(url, object);
	},
	editEmployee({ id, object }: EmployeeEditProps) {
		const url = `/todo/employee/${id}`;
		return axiosClient.put(url, object);
	},
};
export default employee;
