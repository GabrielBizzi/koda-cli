export const Preload = () => {
	return (
		<div className="w-screen h-screen flex flex-1 items-center gap-1 justify-center space-x-2  bg-white">
			<span className="sr-only">Loading...</span>
			<div className="h-[10px] w-[10px] bg-[#121212] rounded-full animate-bounce [animation-delay:-0.3s]" />
			<div className="h-[10px] w-[10px] bg-[#121212] rounded-full animate-bounce [animation-delay:-0.15s]" />
			<div className="h-[10px] w-[10px] bg-[#121212] rounded-full animate-bounce " />
		</div>
	);
};
