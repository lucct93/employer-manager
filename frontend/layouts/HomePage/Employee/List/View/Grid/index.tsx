import { Popconfirm, Tooltip } from 'antd';
import { EmployeeProps } from 'models/Employee/List';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from 'constants/enums/routes';
import { useDeleteEmployeeRequest } from 'hooks/Employee/useDelete';
import { memo } from 'react';
import { imageUrl } from 'constants/url';
import { reverseGender } from 'constants/Employee';
import { faTrashCan, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const GridView = ({
	data,
	refetch,
}: {
	data: EmployeeProps[];
	refetch: Function;
}) => {
	const { mutate } = useDeleteEmployeeRequest(() => {
		refetch();
	});
	const confirm = (id: string) => {
		mutate(id);
	};
	return (
		<div className='flex justify-start items-center flex-wrap mt-[1rem] '>
			{data?.length > 0 &&
				data.map((v) => {
					return (
						<div
							key={v.uuid}
							className='rounded-[0.25rem] max-w-[180px] min-h-[100px] shadow mr-[1rem] mb-[1rem]'
						>
							<Link legacyBehavior href={`${ROUTES.EMPLOYEE_DETAIL}/${v.uuid}`}>
								<Image
									className='rounded-[0.25rem] default cursor-pointer'
									src={v.photo || imageUrl}
									width={180}
									height={180}
									objectFit='contain'
									alt='EmployeeManagerItem'
								/>
							</Link>
							<div className='employer-info px-[0.75rem] py-[0.5rem]'>
								<Link
									legacyBehavior
									href={`${ROUTES.EMPLOYEE_DETAIL}/${v.uuid}`}
								>
									<Tooltip
										placement='bottomLeft'
										title={`${v.firstName} ${v.lastName}`}
									>
										<p className='default text-[blue] text-[0.65rem] m-0 p-0 font-[600] wordBreak cursor-pointer '>{`${v.firstName} ${v.lastName}`}</p>
									</Tooltip>
								</Link>
								<Tooltip placement='bottomLeft' title={v.email}>
									<p className='default text-[0.65rem] m-0 p-0 font-[600] wordBreak cursor-pointer '>
										{v.email}
									</p>
								</Tooltip>

								<p className='default text-[0.65rem] m-0 p-0 font-[600] wordBreak '>
									{v.phone}
								</p>
								<div className='flex justify-between items-center'>
									<p className='default text-[0.65rem] m-0 p-0 font-[600] wordBreak '>
										{reverseGender[v.gender]}
									</p>
									<div className='flex justify-end items-center'>
										<Popconfirm
											placement='bottomRight'
											title={`Are you sure to delete this '${v.firstName} ${v.lastName}' employee?`}
											// description='Are you sure to delete this employee?'
											// @ts-ignore: Unreachable code error
											onConfirm={() => confirm(v.uuid)}
											// onCancel={cancel}
											okText='Yes'
											cancelText='No'
										>
											<div className='btn-employer-delete bg-red shadow w-[1.9rem] h-[1.9rem] cursor-pointer rounded-[50%] p-[0.5rem] flex justify-center items-center'>
												<FontAwesomeIcon
													className='text-white text-[0.75rem]'
													icon={faTrashCan}
												/>
											</div>
										</Popconfirm>

										<div className='ml-[0.25rem]'>
											<Link
												legacyBehavior
												href={`${ROUTES.EMPLOYEE_EDIT}/${v.uuid}`}
											>
												<div className='btn-employer-edit bg-[#00F173] shadow w-[1.9rem] h-[1.9rem] cursor-pointer rounded-[50%] p-[0.5rem] flex justify-center items-center'>
													<FontAwesomeIcon
														className='text-white text-[0.75rem]'
														icon={faUserPen}
													/>
												</div>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};
export default memo(GridView);
