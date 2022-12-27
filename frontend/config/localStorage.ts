import { UserInformationProps } from 'redux/reducers/common/model';
class LocalStorageClass {
	getLocalUserInformation() {
		const accessTokenLocal =
			typeof window !== 'undefined' && localStorage?.getItem('userInformation');
		if (accessTokenLocal) {
			return JSON.parse(accessTokenLocal);
		}
	}
	updateLocalUserInformation(userInformation: UserInformationProps<string>) {
		if (userInformation) {
			typeof window !== 'undefined' &&
				localStorage?.setItem(
					'userInformation',
					JSON.stringify(userInformation)
				);
		}
	}
	removeLocalUserInformation() {
		typeof window !== 'undefined' && localStorage?.clear();
	}
}

export default new LocalStorageClass();
