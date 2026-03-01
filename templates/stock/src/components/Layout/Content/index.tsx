import React from 'react';

export const Content = ({ children }: React.PropsWithChildren) => {
	return (
		<main className="bg-white rounded w-full p-3 border-zinc-400 shadow-md">
			{children}
		</main>
	);
};
