import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { EmployeeProps, ResponProps } from 'models/Employee/List';
import EmployeeCommon from 'layouts/HomePage/Employee/Common/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import { EmployeeType } from 'constants/enums/Employee';
import { GENDER } from 'constants/enums/common';
import { createRouter } from 'next/router';

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

jest.mock('../hooks/Employee/useEmployee', () => ({
	useEmployee: jest.fn(),
}));
jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));
describe('Homepage', () => {
	it('renders a homepage gridview', async () => {
		const data: EmployeeProps = {
			uuid: 1,
			firstName: 'Mohamad',
			lastName: 'Alli',
			email: 'alli.m@gmail.com',
			phone: '0122853752',
			gender: GENDER.MALE,
			createdAt: '2022-12-26T04:33:30.472Z',
			updatedAt: '2022-12-26T04:33:30.472Z',
		};
		render(
			<QueryClientProvider client={new QueryClient()}>
				<EmployeeCommon type={EmployeeType.DETAIL} objectEmployee={data} />
			</QueryClientProvider>
		);
		// check if all label are rendered
		expect(screen.getByText(/First name/)).toBeVisible();
		expect(screen.getByText(/Last name/)).toBeVisible();
		expect(screen.getByText(/Email/)).toBeVisible();
		expect(screen.getByText(/Phone/)).toBeVisible();
		expect(screen.getByText(/Gender/)).toBeVisible();

		// check if all components are rendered
		expect(screen.getByDisplayValue(/Mohamad/)).toBeVisible();
		expect(screen.getByDisplayValue(/Alli/)).toBeVisible();
		expect(screen.getByDisplayValue(/alli.m@gmail.com/)).toBeVisible();
		expect(screen.getByDisplayValue(/0122853752/)).toBeVisible();
		expect(screen.getByDisplayValue(/M/)).toBeVisible();
	});
});
