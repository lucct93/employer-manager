import { TablePaginationConfig } from 'antd/es/table';
import { Pagination, TimeDebounce } from 'constants/enums/common';
import { memo, useEffect, useState } from 'react';
// import Highlighter from 'react-highlight-words';
import ButtonCommon from 'components/Button';
import Link from 'next/link';
import { SearchProps } from 'models/Employee/List/index';
import { ROUTES } from 'constants/enums/routes';
import { SearchType, View } from 'constants/enums/Employee';
import GridView from './View/Grid';
import ListView from './View/List';
import { useEmployee } from 'hooks/Employee/useEmployee';
import { Time } from 'constants/time';
import { notify } from 'utils/notification';
import { debounce } from 'utils/utils';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const EmployeeList = () => {
	const [view, setView] = useState<View>(View.GRID_VIEW);
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: Pagination.PAGE,
		pageSize: Pagination.LIMIT,
	});
	const [searchCommon, setSearchCommon] = useState<SearchProps>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		gender: '',
	});
	const { firstName, lastName, email, phone, gender } = searchCommon;
	const {
		isLoading,
		data: employeeListCSR,
		isError,
		error,
		refetch,
	}: any = useEmployee({
		pageIndex: pagination?.current || Pagination.PAGE,
		pageSize: pagination?.pageSize || Pagination.LIMIT,
		firstName,
		lastName,
		email,
		phone,
		gender,
	});
	if (isError) notify('error', error.message, Time.NOTIFY);

	const handleRefetch = debounce(
		async (
			e: string,
			type:
				| SearchType.firstName
				| SearchType.lastName
				| SearchType.email
				| SearchType.phone
		) => {
			await setSearchCommon({ ...searchCommon, [type]: e });
			await setPagination({ ...pagination, current: Pagination.PAGE });
		},
		TimeDebounce.TIME
	);

	useEffect(() => {
		const local: any = localStorage?.getItem('view-type');
		const viewType =
			typeof window !== 'undefined' && local ? local : View.GRID_VIEW;
		setView(viewType);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		setPagination({
			...pagination,
			current: Pagination.PAGE,
			pageSize:
				view === View.GRID_VIEW ? Pagination.LIMIT_MAX : Pagination.LIMIT,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view]);
	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	return (
		<section>
			<div className='flex justify-end items-center '>
				<Link legacyBehavior href={ROUTES.EMPLOYEE_ADD}>
					<ButtonCommon
						className='bg-[#6B00F8] rounded-[2rem] min-w-[1rem] '
						content='ADD EMPLOYEE'
					/>
				</Link>
				<div
					onClick={() => {
						const dataView =
							view === View.TABLE_VIEW ? View.GRID_VIEW : View.TABLE_VIEW;
						setView(dataView);
						localStorage.setItem('view-type', dataView);
					}}
					data-testid='change-view-type'
					className='bg-[#6B00F8] mt-[0.5rem] ml-[0.75rem] cursor-pointer text-white px-[0.75rem] py-[0.75rem] rounded-[50%] flex justify-center items-center'
				>
					<FontAwesomeIcon
						className='cursor-pointer text-white text-[1rem]'
						icon={faBars}
					/>
				</div>
			</div>
			{view === View.TABLE_VIEW ? (
				<ListView
					isLoading={isLoading}
					searchCommon={searchCommon}
					refetch={refetch}
					data={employeeListCSR?.data?.items || []}
					handleRefetch={handleRefetch}
				/>
			) : (
				<GridView data={employeeListCSR?.data?.items || []} refetch={refetch} />
			)}
		</section>
	);
};
export default memo(EmployeeList);
