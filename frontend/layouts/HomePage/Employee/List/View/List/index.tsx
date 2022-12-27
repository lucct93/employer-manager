import {
	Button,
	Popconfirm,
	Select,
	TablePaginationConfig,
} from 'antd';
import TableComponent from 'components/Table/index';
import { EmployeeFilterProps, EmployeeProps } from 'models/Employee/List';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from 'constants/enums/routes';
import { useDeleteEmployeeRequest } from 'hooks/Employee/useDelete';
import { memo, useState } from 'react';
import { imageUrl } from 'constants/url';
import { reverseGender } from 'constants/Employee';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableTitle, SearchType } from 'constants/enums/Employee';
import { GENDER, Pagination } from 'constants/enums/common';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/es/table';

const ListView = ({
	isLoading,
	searchCommon,
	data,
	handleRefetch,
	refetch,
}: {
	isLoading: boolean;
	searchCommon: any;
	data: EmployeeProps[];
	handleRefetch: Function;
	refetch: Function;
}) => {
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: Pagination.PAGE,
		pageSize: Pagination.LIMIT,
	});

	const { mutate } = useDeleteEmployeeRequest(() => {
		refetch();
	});

	const handleTableChange = (newPagination: TablePaginationConfig) => {
		setPagination({
			...pagination,
			current: newPagination?.current || Pagination.PAGE,
			pageSize: newPagination?.pageSize || Pagination.LIMIT,
		});
	};
	const confirm = (id: string) => {
		mutate(id);
	};

	const handleRefactorListSearch = ({
		dataIndex,
		type,
	}: {
		dataIndex: string;
		type:
			| SearchType.firstName
			| SearchType.lastName
			| SearchType.email
			| SearchType.gender
			| SearchType.phone;
	}) => {
		const listTemp: string[] = [];
		data.forEach((v: any) => {
			listTemp.push(v[type]);
		});
		return (
			<Select
				className='searchWidth'
				showSearch
				value={searchCommon[type] || undefined}
				allowClear
				placeholder={`Search or select ${dataIndex}`}
				optionFilterProp='children'
				onChange={(e: string) => handleRefetch(e, type)}
				onSearch={(e: string) => e && handleRefetch(e, type)}
				filterOption={(input, option) =>
					(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
				}
				options={Array.from(new Set(listTemp)).map((v) => {
					return {
						value: v,
						label: v,
					};
				})}
			/>
		);
	};

	const getColumnSearchProps = (
		dataIndex: string,
		type:
			| SearchType.firstName
			| SearchType.lastName
			| SearchType.email
			| SearchType.phone
			| SearchType.gender
	): ColumnType<EmployeeFilterProps> => ({
		filterDropdown: ({}) => (
			<div className='search' onKeyDown={(e) => e.stopPropagation()}>
				<div>{handleRefactorListSearch({ dataIndex, type })}</div>
			</div>
		),
		filterIcon: () => <SearchOutlined />,
	});

	const columns: any = [
		{
			title: 'Image',
			dataIndex: 'image',
			width: 120,
			render: (_: string, record: EmployeeProps) => (
				<Link legacyBehavior href={`${ROUTES.EMPLOYEE_DETAIL}/${record.uuid}`}>
					<Image
						src={record.photo || imageUrl}
						width={120}
						height={120}
						objectFit='contain'
						alt='EmployeeManagerImage'
					/>
				</Link>
			),
		},
		{
			title: TableTitle.FIRST_NAME,
			dataIndex: SearchType.firstName,
			width: 150,
			sorter: (a: EmployeeProps, b: EmployeeProps) =>
				a.firstName.length - b.firstName.length,
			...getColumnSearchProps(
				TableTitle.FIRST_NAME.toLowerCase(),
				SearchType.firstName
			),
			render: (_: string, record: EmployeeProps) => (
				<Link legacyBehavior href={`${ROUTES.EMPLOYEE_DETAIL}/${record.uuid}`}>
					{record?.firstName}
				</Link>
			),
		},
		{
			title: TableTitle.LAST_NAME,
			dataIndex: SearchType.lastName,
			width: 150,
			sorter: (a: EmployeeProps, b: EmployeeProps) =>
				a.lastName.length - b.lastName.length,
			...getColumnSearchProps(
				TableTitle.LAST_NAME.toLowerCase(),
				SearchType.lastName
			),
			render: (text: string) => <p className='default'>{text}</p>,
		},
		{
			title: TableTitle.EMAIL_ADDRESS,
			dataIndex: SearchType.email,
			width: 220,
			sorter: (a: EmployeeProps, b: EmployeeProps) =>
				a.email.length - b.email.length,
			...getColumnSearchProps(
				TableTitle.EMAIL_ADDRESS.toLowerCase(),
				SearchType.email
			),
			render: (text: string) => <p className='default'>{text}</p>,
		},
		{
			title: TableTitle.PHONE_NUMBER,
			dataIndex: SearchType.phone,
			width: 170,
			sorter: (a: EmployeeProps, b: EmployeeProps) =>
				a.phone.length - b.phone.length,
			...getColumnSearchProps(
				TableTitle.PHONE_NUMBER.toLowerCase(),
				SearchType.phone
			),
		},
		{
			title: TableTitle.GENDER,
			dataIndex: SearchType.gender,
			width: 170,
			sorter: (a: EmployeeProps, b: EmployeeProps) =>
				reverseGender[a.gender].length - reverseGender[b.gender].length,
			...getColumnSearchProps(
				TableTitle.GENDER.toLowerCase(),
				SearchType.gender
			),
			render: (text: GENDER.FEMALE | GENDER.MALE) => (
				<p className='default'>{reverseGender[text]}</p>
			),
		},
		{
			title: 'Action',
			dataIndex: 'action',
			fixed: 'right',
			width: 85,
			render: (_: any, record: EmployeeProps) => (
				<div className='flex justify-start items-center'>
					<Link legacyBehavior href={`${ROUTES.EMPLOYEE_EDIT}/${record.uuid}`}>
						<Button type='primary' className='edit mr-[0.5rem]'>
							Edit
						</Button>
					</Link>
					<Popconfirm
						placement='bottomRight'
						title={`Are you sure to delete this '${record.firstName} ${record.lastName}' employee?`}
						// description='Are you sure to delete this employee?'
						// @ts-ignore: Unreachable code error
						onConfirm={() => confirm(record.uuid)}
						// onCancel={cancel}
						okText='Yes'
						cancelText='No'
					>
						<FontAwesomeIcon
							className='cursor-pointer text-red text-[1.9rem]'
							icon={faTrashCan}
						/>
					</Popconfirm>
				</div>
			),
		},
	];

	return (
		<TableComponent
			showTotalTitle
			columns={columns}
			loading={isLoading}
			pagination={pagination}
			data={data}
			handleTableChange={handleTableChange}
		/>
	);
};
export default memo(ListView);
