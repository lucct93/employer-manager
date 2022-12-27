import HelmetCommon from 'components/Helmet';
import { ROUTES } from 'constants/enums/routes';
import dynamic from 'next/dynamic';
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
		return {
			props: {
				data: {
					items: [],
				},
			},
		};
	} catch (error) {
		return { notFound: true };
	}
}
export default HomePage;
