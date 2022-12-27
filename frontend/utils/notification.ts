import { toast } from 'react-toastify';
import { TimeDebounce } from 'constants/enums/common';
import { debounce } from './utils';
export const notify = debounce(
	(type: string, message: string, time: number) => {
		if (type === 'success' || type === 'warning' || type === 'error') {
			toast[type](`${message}`, {
				position: 'top-right',
				autoClose: time,
				theme: 'colored', // light, dark
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	},
	TimeDebounce.TIME
);
