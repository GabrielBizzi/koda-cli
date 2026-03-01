'use client';
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
} from 'react';

interface SidebarContextProps {
	sidebarExpanded: boolean;
	setSidebarExpanded: Dispatch<SetStateAction<boolean>>;
	toggleSidebarExpanded: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
	undefined,
);

export const SidebarProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [sidebarExpanded, setSidebarExpanded] =
		React.useState<boolean>(false);

	const toggleSidebarExpanded = useCallback(() => {
		setSidebarExpanded((prev) => !prev);
	}, []);

	return (
		<SidebarContext.Provider
			value={{
				sidebarExpanded,
				toggleSidebarExpanded,
				setSidebarExpanded,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = useContext(SidebarContext);

	if (!context) {
		throw new Error(
			'useSidebar deve ser usado dentro de um SidebarProvider',
		);
	}
	return context;
};
