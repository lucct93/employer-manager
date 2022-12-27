import axios, { AxiosRequestConfig } from 'axios';

const axiosClient: any = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: false,
});
axiosClient.interceptors.request.use(
	(config: AxiosRequestConfig<any>) => {
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);
axiosClient.interceptors.response.use(
	(res: any) => {
		return res;
	},
	async (err: any) => {
		return Promise.reject(err);
	}
);
export default axiosClient;
