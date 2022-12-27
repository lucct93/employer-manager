import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { memo } from 'react';
const TableComponent = ({
	columns,
	data,
	handleTableChange,
	pagination,
	loading,
	rowSelection,
	rowClassName,
	showTotalTitle,
}: {
	columns: ColumnsType<any>;
	data: any[];
	handleTableChange: (newPagination: TablePaginationConfig) => void;
	pagination?: TablePaginationConfig;
	loading?: boolean;
	rowSelection?: any;
	rowClassName?: any;
	showTotalTitle: boolean;
}) => {
	return (
		<Table
			className='mt-[1rem]  '
			rowKey={(record) => record.uuid}
			columns={columns}
			rowClassName={rowClassName}
			loading={loading}
			rowSelection={rowSelection}
			bordered
			dataSource={data}
			scroll={{ x: 1500 }}
			onChange={handleTableChange}
			pagination={{
				...pagination,
				pageSizeOptions: [10, 30, 50, 100],
				showSizeChanger: true,
				showTotal: (total: number, range: any) => {
					return showTotalTitle && data?.length > 0 ? (
						<b>{`Total: ${total} (show: ${range[0]}-${range[1]})`}</b>
					) : (
						''
					);
				},
			}}
		/>
	);
};
export default memo(TableComponent);
