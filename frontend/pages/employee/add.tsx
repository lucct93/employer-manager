import HelmetCommon from 'components/Helmet';
import { EmployeeType } from 'constants/enums/Employee';
import { ROUTES } from 'constants/enums/routes';
import dynamic from 'next/dynamic';
const EmployeeCommon = dynamic(
	() => import('layouts/HomePage/Employee/Common/index')
);
const HomPage = () => {
	return (
		<>
			<HelmetCommon
				title='Employee Manager Add'
				description='Description employee manager add...'
				href={ROUTES.EMPLOYEE_ADD}
			/>
			<EmployeeCommon type={EmployeeType.ADD} />
		</>
	);
};
export default HomPage;
