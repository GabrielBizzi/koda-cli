import { createContext, useContext } from 'react';

export type OverlayState = {
	isOverlay: boolean;
	width: number;
	closeOverlay?: () => void;
	onSuccess?: (() => void) | null;
	setOnSuccess?: React.Dispatch<React.SetStateAction<(() => void) | null>>;
};

export const OverlayContext = createContext<OverlayState>({
	isOverlay: false,
	width: 0,
});

export const useOverlay = () => {
	return useContext(OverlayContext);
};
