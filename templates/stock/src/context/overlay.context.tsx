'use client';
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from 'react';

type MountContextType = {
	isClosing: boolean;
	isMounted: boolean;
	setIsClosing: Dispatch<SetStateAction<boolean>>;
	setIsMounted: Dispatch<SetStateAction<boolean>>;
	handleClose: () => void;
	reset: () => void;
};

const MountContext = createContext<MountContextType | null>(null);

export const MountProvider = ({ children }: { children: React.ReactNode }) => {
	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const handleClose = () => {
		setIsClosing(true);
		setIsMounted(false);
	};

	const reset = () => {
		setIsClosing(false);
		setIsMounted(false);
	};

	return (
		<MountContext.Provider
			value={{
				isClosing,
				isMounted,
				setIsClosing,
				setIsMounted,
				handleClose,
				reset,
			}}
		>
			{children}
		</MountContext.Provider>
	);
};

export const useMount = () => {
	const context = useContext(MountContext);
	if (!context) throw new Error('useMount must be used within MountProvider');
	return context;
};
