import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ResponProps } from 'models/Employee/List';
import EmployeeList from 'layouts/HomePage/Employee/List/index';
// var axios = require('axios');
// var MockAdapter = require('axios-mock-adapter');
// var mock = new MockAdapter(axios);
import { QueryClient, QueryClientProvider } from 'react-query';
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
	useEmployee: jest.fn().mockReturnValue({
		isLoading: false,
		data: {
			data: {
				items: [
					{
						createdAt: '2022-12-26T04:33:30.472Z',
						updatedAt: '2022-12-26T04:33:30.472Z',
						uuid: 1,
						firstName: 'Henri',
						lastName: 'Rodriguez',
						email: 'Darrin_Rippin@gmail.com',
						phone: '+94771277218',
						gender: 'M',
					},
				],
			},
		},
		isError: false,
		error: {},
		refetch: jest.fn(),
	}),
}));
describe('Homepage', () => {
	it('renders a homepage gridview', async () => {
		const data: ResponProps = {
			items: [],
			pageSize: 10,
			pageIndex: 1,
			totalItems: 1,
			totalPages: 1,
			hasPrevPage: false,
			hasNextPage: false,
		};
		render(
			<QueryClientProvider client={new QueryClient()}>
				<EmployeeList data={data} />
			</QueryClientProvider>
		);
		// check if all components are rendered
		expect(screen.getByText(/Henri/)).toBeVisible();
		expect(screen.getByText(/Rodriguez/)).toBeVisible();
		expect(screen.getByText(/\+94771277218/)).toBeVisible();
		expect(screen.getByText(/Male/)).toBeVisible();
		expect(screen.getByText(/Darrin_Rippin@gmail.com/)).toBeVisible();

		const elements = await screen.findAllByAltText('EmployeeManagerItem');
		expect(elements).toHaveLength(1);
	});

	it('renders a homepage list view', async () => {
		// jest.spyOn(window, 'getItem');
		// localStorage.getItem = jest.fn().mockReturnValue(View.TABLE_VIEW);

		const data: ResponProps = {
			items: [],
			pageSize: 10,
			pageIndex: 1,
			totalItems: 1,
			totalPages: 1,
			hasPrevPage: false,
			hasNextPage: false,
		};
		const { container } =  render(
			<QueryClientProvider client={new QueryClient()}>
				<EmployeeList data={data} />
			</QueryClientProvider>
		);
		fireEvent.click(screen.getByTestId('change-view-type'));
		// check if all header are rendered
		expect(screen.getByText(/Image/)).toBeVisible();
		expect(screen.getByText(/First name/)).toBeVisible();
		expect(screen.getByText(/Last name/)).toBeVisible();
		expect(screen.getByText(/Email address/)).toBeVisible();
		expect(screen.getByText(/Phone number/)).toBeVisible();
		// check if all components are rendered
		expect(screen.getByText(/Henri/)).toBeVisible();
		expect(screen.getByText(/Rodriguez/)).toBeVisible();
		expect(screen.getByText(/\+94771277218/)).toBeVisible();
		expect(screen.getByText(/Male/)).toBeVisible();
		expect(screen.getByText(/Darrin_Rippin@gmail.com/)).toBeVisible();
		expect(container.getElementsByClassName('ant-table-row').length).toBe(1);
	});
});
