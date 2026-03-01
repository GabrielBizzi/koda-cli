'use client';
import { ErrorDialog } from '@/components/Error';
import { AxiosError } from 'axios';
import { createContext, useContext, useState } from 'react';

type ErrorPopupContextType = {
	showError: (err: AxiosError, message?: string) => void;
	showMessage?: (err: string) => void;
};

const ErrorPopupContext = createContext<ErrorPopupContextType | undefined>(
	undefined,
);

export const ErrorPopupProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [error, setError] = useState<AxiosError | undefined>(undefined);
	const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
	const [errorMessage, setErrorMessage] = useState<string | undefined>(
		undefined,
	);

	const showError = (err: AxiosError, message?: string) => {
		setError(err);
		setErrorMsg(message);
	};
	const showMessage = (err: string) => setErrorMessage(err);

	const handleClose = () => setError(undefined);

	return (
		<ErrorPopupContext.Provider value={{ showError, showMessage }}>
			{children}
			{(error || errorMessage) && (
				<ErrorDialog
					title="Ops... Algo deu errado."
					open={!!error}
					err={error}
					message={errorMsg || errorMessage}
					onClose={handleClose}
				/>
			)}
		</ErrorPopupContext.Provider>
	);
};

export const useErrorPopup = () => {
	const context = useContext(ErrorPopupContext);
	if (!context)
		throw new Error(
			'useErrorPopup precisa estar dentro de <ErrorPopupProvider>',
		);
	return context;
};
