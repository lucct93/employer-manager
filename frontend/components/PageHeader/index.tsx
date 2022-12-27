import { PageHeader } from 'antd';
import { useRouter } from 'next/router';
export const BackPreviousPage = ({
	title,
	des,
}: {
	title: string;
	des?: string;
}) => {
	const router = useRouter();
	return (
		<PageHeader
			className='default'
			onBack={() => router.back()}
			title={
				<h1
					onClick={() => router.back()}
					className='text-[1.15rem] cursor-pointer m-0 p-0 mt-[0.15rem] '
				>
					{title}
				</h1>
			}
			subTitle={des}
		/>
	);
};
