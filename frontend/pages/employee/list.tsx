import HelmetCommon from 'components/Helmet';
import { Pagination } from 'constants/enums/common';
import { ROUTES } from 'constants/enums/routes';
import { ResponProps } from 'models/Employee/List';
import dynamic from 'next/dynamic';
import employee from 'services/Employee';
const EmployeeList = dynamic(
	() => import('layouts/HomePage/Employee/List/index')
);
const HomePage = () => {
	return (
		<>
			<HelmetCommon
				title='Employee Manager List'
				description='Description employee manager list...'
				href={ROUTES.EMPLOYEE_LIST}
			/>
			<EmployeeList />
		</>
	);
};
export async function getServerSideProps() {
	try {
		const { data }: { data: ResponProps } = await employee.getAllEmployee({
			pageIndex: Pagination.PAGE,
			pageSize: Pagination.LIMIT,
		});
		if (!data || data?.items?.length === 0) {
			return { notFound: true };
		}
		return {
			props: {
				data,
			},
		};
	} catch (error) {}
}
export default HomePage;
