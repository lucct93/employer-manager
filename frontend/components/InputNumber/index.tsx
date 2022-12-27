import { InputNumber } from 'antd';
import TextErrors from 'components/TextErrors/index';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
const InputNumberComponent = ({
	name,
	min,
	max,
	className,
	addonAfter,
}: {
	name: string;
	min: number;
	max: number;
	className?: string;
	addonAfter?: string;
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
					<>
						<InputNumber
							className={`${className} full`}
							addonAfter={addonAfter}
							min={min}
							max={max}
							formatter={(value) =>
								`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
							}
							parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
							defaultValue={1}
							{...field}
						/>
						{errors[name]?.message && (
							<TextErrors message={errors[name]?.message} />
						)}
					</>
				);
			}}
		/>
	);
};
export default memo(InputNumberComponent);
