import { Spin } from 'antd';
const Loading = () => {
	return (
		<div className='fixed bg-loadingGradient top-0 bottom-0 flex justify-center items-center right-0 left-0 z-[12]'>
			<Spin size='large' />
		</div>
	);
};
export default Loading;
