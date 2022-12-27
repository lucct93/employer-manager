export interface UserInformationProps<T> {
	access_token: T;
	background: T;
	birthday: T;
	email: T;
	facebook_link: T;
	firstName: T;
	gender: T;
	lastName: T;
	phone: T;
	point: any;
	provider: T;
	refresh_token: T;
	role: T;
	status: T;
	uuid: T;
	country: {
		code: T;
		code2: T;
		createdAt: T;
		id: number;
		logo: T;
		mobile_code: T;
		name: T;
		status: any;
		updatedAt: T;
	};
	wallet: {
		amount: number;
		amount_past: number;
		createdAt: T;
		updatedAt: T;
		userUuid: T;
		uuid: T;
	};
	company: {
		address: T;
		background: T;
		businessContract: any;
		createdAt: T;
		description: T;
		email: any;
		format: T;
		hiringEmail: any;
		logo: T;
		name: T;
		numberPersonnel: number;
		taxNumber: any;
		updatedAt: T;
		uuid: T;
	};
	avatar: T;
}
export interface InitialStateProps<T> {
	userInformation: UserInformationProps<T> | {};
}
