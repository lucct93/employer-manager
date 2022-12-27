import { Controller, useFormContext } from 'react-hook-form';
import TextErrors from 'components/TextErrors/index';
import { Select } from 'antd';
import { ListProps } from 'models/Common';
const { Option } = Select;
const SelectComponent = ({
	name,
	data,
	className,
	placeholder,
	disabled,
}: {
	name: string;
	data: ListProps<string>[];
	className?: string;
	placeholder: string;
	disabled?: boolean;
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
						<Select
							disabled={disabled}
							className={`${className} w-full`}
							placeholder={placeholder}
							filterOption={(input, option) =>
								(option!.children as unknown as string)
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							{...field}
						>
							{data?.length > 0 &&
								data.map((values, index) => {
									return (
										<Option key={index} value={values.value}>
											{values.key}
										</Option>
									);
								})}
						</Select>
						{errors[name]?.message && (
							<TextErrors message={errors[name]?.message} />
						)}
					</>
				);
			}}
		/>
	);
};
export default SelectComponent;
