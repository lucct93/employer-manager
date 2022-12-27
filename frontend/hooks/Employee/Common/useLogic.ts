import validations from 'constants/validations';
import regex from 'utils/regex';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { usePostEmployee, usePutEmployee } from 'hooks/Employee/usePost';
export const useLogic = () => {
	const router = useRouter();
	const { mutate: mutateAdd } = usePostEmployee();
	const { mutate: mutateEdit } = usePutEmployee();
	const yupSchemaUpdateUser = yup.object().shape({
		email: yup
			.string()
			.required(validations.email.required)
			.matches(regex.email, validations.email.valid),
		firstName: yup
			.string()
			.required(validations.firstName.required)
			.min(6, validations.firstName.min)
			.max(10, validations.firstName.max)
			.matches(regex.character, validations.firstName.alpha),
		lastName: yup
			.string()
			.required(validations.lastName.required)
			.min(6, validations.lastName.min)
			.max(10, validations.lastName.max)
			.matches(regex.character, validations.lastName.alpha),
		phone: yup
			.string()
			.required(validations.phone.required)
			.matches(regex.phone, {
				message: validations.phone.valid,
				excludeEmptyString: true,
			}),
	});
	return {
		router,
		yupSchemaUpdateUser,
		mutateAdd,
		mutateEdit,
	};
};
