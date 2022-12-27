import { Input } from 'antd';
import TextErrors from 'components/TextErrors/index';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
const { TextArea } = Input;
const InputAreaComponent = ({
	name,
	placeholder,
	className,
	disable = false,
	row,
}: {
	name: string;
	placeholder: string;
	className?: string;
	disable?: boolean;
	row?: number;
}) => {
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
					<div>
						<TextArea
							disabled={disable}
							className={className}
							rows={row || 5}
							placeholder={placeholder}
							{...field}
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
export default memo(InputAreaComponent);
