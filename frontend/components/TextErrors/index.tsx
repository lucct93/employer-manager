const TextErrors = ({ message }: any) => {
	return (
		<h6 className='text-red font-[500] w-full bg-transparent m-0 mt-1 smPhone:text-[12px] '>
			{message}
		</h6>
	);
};
export default TextErrors;
