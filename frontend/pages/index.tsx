import HelmetCommon from 'components/Helmet';
import { View } from 'constants/enums/Employee';
import { ROUTES } from 'constants/enums/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.push(ROUTES.EMPLOYEE_LIST);
		localStorage.setItem('view-type', View.GRID_VIEW);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<HelmetCommon
				title='Employee Manager Home Page'
				description='Description employee manager home page...'
				href={ROUTES.HOME_PAGE}
			/>
		</>
	);
}
