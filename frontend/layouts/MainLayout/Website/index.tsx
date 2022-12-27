import { ReactElement } from 'react';
import FooterComponent from '../Component/Footer';
import HeaderComponent from '../Component/Header';
const WebsiteComponent = (props: { children: ReactElement }) => {
	return (
		<div className='w-full'>
			<HeaderComponent />
			<main className='w-full px-[20px] py-[57.5px]'>{props.children}</main>
			<FooterComponent />
		</div>
	);
};
export default WebsiteComponent;
