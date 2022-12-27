import { Input } from 'antd';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextErrors from 'components/TextErrors/index';
interface InputProps<T> {
	name: T;
	className?: T;
	placeholder: T;
	disabled?: boolean;
}
const InputComponent = ({
	name,
	placeholder,
	className,
	disabled,
}: InputProps<string>) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				return (
					<div className={className}>
						<Input
							disabled={disabled}
							allowClear
							{...field}
							status={errors[name]?.message ? 'error' : ''}
							className={` w-full ${
								errors[name]?.message ? 'border-error' : 'border-normal'
							}`}
							placeholder={placeholder}
						/>
						{errors[name]?.message && (
							<TextErrors message={errors[name]?.message} />
						)}
					</div>
				);
			}}
		/>
	);
};
export default memo(InputComponent);
