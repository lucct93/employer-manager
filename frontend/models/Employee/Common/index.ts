import { EmployeeType } from 'constants/enums/Employee';
import { EmployeeProps } from '../List';
export interface EmployeeCommonProps {
	type: EmployeeType;
	objectEmployee?: EmployeeProps;
}
