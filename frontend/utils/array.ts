export const convertEmailsToArray = (emails: string): Array<string> => {
	return emails.split(',').map((email) => email.trim());
};

export const uuidArrayMapper = (items: Array<any>) => {
	return items.map((item: any) =>
		typeof item === 'string' ? { id: item } : { id: item.id }
	);
};
