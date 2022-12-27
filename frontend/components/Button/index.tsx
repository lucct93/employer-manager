const ButtonCommon = ({
	content,
	className,
	onClick,
}: {
	content: string;
	className?: string;
	onClick?: any;
}) => {
	return (
		<button
			onClick={onClick}
			className={`min-w-[10.75rem] text-white mt-[0.5rem] px-[1rem] py-[0.5rem] ${className}`}
			type='submit'
		>
			{content}
		</button>
	);
};
export default ButtonCommon;
