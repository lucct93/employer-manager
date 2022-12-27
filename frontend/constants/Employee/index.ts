import { GENDER } from 'constants/enums/common';
import { ListProps } from 'models/Common';
import { Gender } from 'models/Employee/List';
export const reverseGender: Gender = {
	F: 'Female',
	M: 'Male',
};
export const listGender: ListProps<string>[] = [
	{ key: GENDER.MALE, value: GENDER.MALE },
	{ key: GENDER.FEMALE, value: GENDER.FEMALE },
];
export const typeButtonEmployee = {
	ADD: 'ADD',
	EDIT: 'SAVE',
	DETAIL: 'NONE',
};
