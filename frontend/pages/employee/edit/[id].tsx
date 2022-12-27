import HelmetCommon from 'components/Helmet';
import { Pagination } from 'constants/enums/common';
import { EmployeeType } from 'constants/enums/Employee';
import { ROUTES } from 'constants/enums/routes';
import { EmployeeProps } from 'models/Employee/List';
import { GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import employee from 'services/Employee';
const EmployeeCommon = dynamic(
	() => import('layouts/HomePage/Employee/Common/index')
);
const HomePage = ({ data }: { data: EmployeeProps }) => {
	return (
		<>
			<HelmetCommon
				title='Employee Manager Edit'
				description='Description employee manager edit...'
				href={ROUTES.EMPLOYEE_EDIT}
			/>
			<EmployeeCommon objectEmployee={data} type={EmployeeType.EDIT} />
		</>
	);
};
export async function getStaticPaths() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API}/todo/employee?pageIndex=${Pagination.PAGE}&pageSize=${Pagination.LIMIT}`
		);
		const employeeList = await res.json();
		const paths =
			employeeList?.items?.length > 0
				? employeeList.items.map((v: EmployeeProps) => {
						return {
							params: { id: String(v.uuid) },
						};
				  })
				: [];
		if (paths?.length === 0) {
			return { notFound: true };
		}
		return {
			paths,
			fallback: true,
		};
	} catch (error) {}
}
export async function getStaticProps(context: GetStaticPropsContext) {
	const { id }: any = context.params;
	if (!id) {
		return { notFound: true };
	}
	try {
		const { data }: { data: EmployeeProps } = await employee.getEmployeeByID(
			id
		);
		if (!data || Object.keys(data).length === 0) {
			return { notFound: true };
		}
		return {
			props: {
				data,
			},
			revalidate: 5,
		};
	} catch (error) {}
}
export default HomePage;
