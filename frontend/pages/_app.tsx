import type { AppProps } from 'next/app';
import { HelmetProvider } from 'react-helmet-async';
import HeadSeo from 'components/Head';
import { Provider } from 'react-redux';
import 'styles/global.css';
import 'styles/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import store from 'config/configureStore';
import WebsiteComponent from 'layouts/MainLayout/Website';
import { QueryClient, QueryClientProvider } from 'react-query';
function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	return (
		<>
			<HeadSeo title='Employer Manager Application' />
			<HelmetProvider>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<WebsiteComponent>
							<Component {...pageProps} />
						</WebsiteComponent>
					</QueryClientProvider>
				</Provider>
				<ToastContainer />
			</HelmetProvider>
		</>
	);
}

export default App;
