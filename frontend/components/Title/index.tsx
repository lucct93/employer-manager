const TitleCommon = ({
	className,
	content,
}: {
	className?: string;
	content: string;
}) => {
	return <h1 className={`${className} m-0 p-0`}>{content}</h1>;
};
export default TitleCommon;
