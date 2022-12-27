import { TablePaginationConfig } from 'antd/es/table';
import { Pagination } from 'constants/enums/common';
import { useEffect, useRef, useState } from 'react';
import { InputRef } from 'antd';
import { View } from 'constants/enums/Employee';
import { useDeleteEmployeeRequest } from 'hooks/Employee/useDelete';
export const useLogic = () => {
	const { mutate } = useDeleteEmployeeRequest();
	const [view, setView] = useState<View>(View.GRID_VIEW);
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		current: Pagination.PAGE,
		pageSize: Pagination.LIMIT,
	});
	const searchInput = useRef<InputRef>(null);
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const handleTableChange = (newPagination: TablePaginationConfig) => {
		setPagination({
			...pagination,
			current: newPagination?.current || Pagination.PAGE,
			pageSize: newPagination?.pageSize || Pagination.LIMIT,
		});
	};
	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};
	const confirm = (id: string) => {
		mutate(id);
	};

	useEffect(() => {
		const local: any = localStorage?.getItem('view-type');
		const viewType = typeof window !== 'undefined' ? local : View.GRID_VIEW;
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
	return {
		confirm,
		handleReset,
		handleTableChange,
		setSearchedColumn,
		setView,
		searchText,
		searchedColumn,
		view,
		pagination,
		searchInput,
	};
};
