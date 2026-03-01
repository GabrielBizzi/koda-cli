'use client';
import { MessageBody, ReauthDialog } from '@/components/Reauth';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { authManager } from '@/managers/auth.manager';

interface ReauthActions {
	reauthenticate: () => Promise<void>;
	logout: () => Promise<void>;
}

interface ReauthContextProps {
	openModal: boolean;
	authenticate: () => Promise<void>;
	closeAndLogout: () => Promise<void>;
}

const ReauthContext = createContext<ReauthContextProps | undefined>(undefined);

export const ReauthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const navigate = useRouter();

	const expiredActionsRef = useRef<ReauthActions | null>(null);
	const registeredRef = useRef(false);

	const [openModal, setOpenModal] = useState(false);
	const [reauthLoading, setReauthLoading] = useState(false);

	useEffect(() => {
		if (registeredRef.current) return;
		registeredRef.current = true;

		authManager.onExpired((actions) => {
			const session = authManager.getSession();

			if (!session?.accessToken) {
				return;
			}

			expiredActionsRef.current = actions;
			setOpenModal(true);
		});
	}, []);

	const authenticate = useCallback(async () => {
		try {
			setReauthLoading(true);

			const actions = expiredActionsRef.current;

			if (actions) {
				await actions.reauthenticate();
			} else {
				await authManager.reauthenticate();
			}

			const session = authManager.getSession();
			if (session?.accessToken) {
				api.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;
			}

			expiredActionsRef.current = null;
			setOpenModal(false);

			window.location.reload();
		} catch (err) {
			console.error('Falha na reautenticação', err);
		} finally {
			setReauthLoading(false);
		}
	}, []);

	const closeAndLogout = useCallback(async () => {
		try {
			const actions = expiredActionsRef.current;

			if (actions) {
				await actions.logout();
			} else {
				await authManager.logout();
			}
		} finally {
			expiredActionsRef.current = null;
			setOpenModal(false);
			navigate.push('/logout');
		}
	}, [navigate]);

	return (
		<ReauthContext.Provider
			value={{ openModal, authenticate, closeAndLogout }}
		>
			{openModal && (
				<ReauthDialog
					onCommit={authenticate}
					width={500}
					onCancel={closeAndLogout}
					title="Sessão expirada"
					submitButtonLabel={
						reauthLoading ? 'Reautenticando...' : 'Reautenticar'
					}
					cancelButtonLabel="Sair"
					open={openModal}
					closable={false}
				>
					<MessageBody>
						Seu token de autenticação expirou. Clique em
						Reautenticar para renovar.
					</MessageBody>
				</ReauthDialog>
			)}

			{children}
		</ReauthContext.Provider>
	);
};

export const useReauth = () => {
	const context = useContext(ReauthContext);
	if (!context) {
		throw new Error('useReauth deve ser usado dentro de um ReauthProvider');
	}
	return context;
};
