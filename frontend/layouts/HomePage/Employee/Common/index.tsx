import TitleCommon from 'components/Title';
import validations from 'constants/validations';
import { EmployeeCommonProps } from 'models/Employee/Common';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import InputComponent from 'components/Input/index';
import ButtonCommon from 'components/Button';
import SelectComponent from 'components/Select';
import { EmployeeType } from 'constants/enums/Employee';
import { memo } from 'react';
import { useLogic } from 'hooks/Employee/Common/useLogic';
import { GENDER } from 'constants/enums/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmployeeAddProps } from 'models/Employee/List';
import { listGender, typeButtonEmployee } from 'constants/Employee';
const EmployeeCommon = ({ type, objectEmployee }: EmployeeCommonProps) => {
	const { router, yupSchemaUpdateUser, mutateAdd, mutateEdit } = useLogic();
	const defaultValues: EmployeeAddProps = {
		firstName: type !== EmployeeType.ADD ? objectEmployee?.firstName || '' : '',
		lastName: type !== EmployeeType.ADD ? objectEmployee?.lastName || '' : '',
		email: type !== EmployeeType.ADD ? objectEmployee?.email || '' : '',
		phone: type !== EmployeeType.ADD ? objectEmployee?.phone || '' : '',
		gender:
			type !== EmployeeType.ADD
				? objectEmployee?.gender || GENDER.MALE
				: GENDER.MALE,
	};
	const methods = useForm<EmployeeAddProps>({
		mode: 'onTouched',
		criteriaMode: 'firstError',
		reValidateMode: 'onChange',
		defaultValues: defaultValues,
		resolver: yupResolver(yupSchemaUpdateUser),
	});
	const onSubmit: SubmitHandler<EmployeeAddProps> = (
		object: EmployeeAddProps
	) => {
		type === EmployeeType.ADD
			? mutateAdd(object)
			: mutateEdit({
					id: String(objectEmployee?.uuid),
					object,
			  });
	};
	return (
		<section>
			<div className='flex justify-end'>
				<ButtonCommon
					onClick={() => router.back()}
					className='bg-[#6B00F8] rounded-[2rem] '
					content='LIST VIEW'
				/>
			</div>
			<div className=' p-[2rem] mt-[1rem] shadow m-[auto] rounded-[1.5rem] '>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<div>
							<div className='flex justify-start items-start'>
								<TitleCommon
									className='text-[0.9rem] w-[6.5rem]'
									content='First name'
								/>
								<InputComponent
									disabled={type === EmployeeType.DETAIL}
									className='mb-[0.5rem] w-full'
									name='firstName'
									placeholder={validations.firstName.placeholder}
								/>
							</div>
							<div className='flex justify-start items-start'>
								<TitleCommon
									className='text-[0.9rem] w-[6.5rem]'
									content='Last name'
								/>
								<InputComponent
									disabled={type === EmployeeType.DETAIL}
									className='mb-[0.5rem] w-full'
									name='lastName'
									placeholder={validations.lastName.placeholder}
								/>
							</div>
							<div className='flex justify-start items-start'>
								<TitleCommon
									className='text-[0.9rem] w-[6.5rem]'
									content='Email'
								/>
								<InputComponent
									disabled={type === EmployeeType.DETAIL}
									className='mb-[0.5rem] w-full'
									name='email'
									placeholder={validations.email.placeholder}
								/>
							</div>
							<div className='flex justify-start items-start'>
								<TitleCommon
									className='text-[0.9rem] w-[6.5rem]'
									content='Phone'
								/>
								<InputComponent
									disabled={type === EmployeeType.DETAIL}
									className='mb-[0.5rem] w-full'
									name='phone'
									placeholder={validations.phone.placeholder}
								/>
							</div>
							<div className='flex justify-start items-start'>
								<TitleCommon
									className='text-[0.9rem] w-[6.5rem]'
									content='Gender'
								/>
								<SelectComponent
									disabled={type === EmployeeType.DETAIL}
									name='gender'
									placeholder='Select a gender'
									data={listGender}
								/>
							</div>
						</div>
						{type !== EmployeeType.DETAIL && (
							<div className='flex justify-end mt-[1.5rem]'>
								<ButtonCommon
									className='text-[#7F17FB] min-w-[7.5rem] borderSubmit font-[600]'
									content={typeButtonEmployee[type]}
								/>
							</div>
						)}
					</form>
				</FormProvider>
			</div>
		</section>
	);
};
export default memo(EmployeeCommon);
