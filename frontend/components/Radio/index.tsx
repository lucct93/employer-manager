import TextErrors from 'components/TextErrors/index';
import { memo } from 'react';
import { Radio } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { ListProps } from 'models/Common';
const RadioComponent = ({
	name,
	data,
	style,
	disable,
}: {
	name: string;
	data: ListProps<string>[];
	style?: React.CSSProperties;
	disable?: boolean;
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
						<Radio.Group disabled={disable} {...field}>
							{data?.length > 0 &&
								data.map((values, index) => {
									return (
										<Radio style={style} key={index} value={values.value}>
											{values.key}
										</Radio>
									);
								})}
						</Radio.Group>
						{errors[name]?.message && (
							<TextErrors message={errors[name]?.message} />
						)}
					</>
				);
			}}
		/>
	);
};
export default memo(RadioComponent);
