export const validations = {
	email: {
		required: 'Email is required',
		valid: 'Invalid email',
		placeholder: 'Input email',
	},
	phone: {
		required: 'Phone is required',
		valid: 'Invalid phone',
		placeholder: 'Input phone',
	},
	password: {
		required: 'Password is required',
		placeholder: 'Input password',
		min: 'Password must be at least 6 characters',
		max: 'Password must be at least 6 characters',
	},
	name: {
		required: 'Name is required',
		placeholder: 'Input name',
	},
	firstName: {
		required: 'First name is required',
		min: 'Minimum 6 characters',
		max: 'Maximum 10 characters',
		placeholder: 'Input first name',
		alpha: 'First name only allows alphabets',
	},
	lastName: {
		required: 'Last name is required',
		min: 'Minimum 6 characters',
		max: 'Maximum 10 characters',
		placeholder: 'Input last name',
		alpha: 'Last name only allows alphabets',
	},
};

export default validations;
