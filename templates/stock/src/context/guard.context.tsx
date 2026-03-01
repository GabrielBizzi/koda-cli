'use client';

import { SignInCredentials } from '@/_types/AuthContext';
import { api } from '@/services/api';
import { useAuth } from '@ti_torra/auth';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import { useSession } from './auth.context';

export function useGuard() {
	const { manager } = useAuth();
	const { session } = useSession();
	const { enqueueSnackbar } = useSnackbar();

	const unlock = useCallback(
		async ({ login, password }: SignInCredentials) => {
			try {
				await api.post(
					`/Auth/v1/Autenticacao`,
					{ login, senha: password },
					{ headers: { auth: true } },
				);

				return { status: 'Success' };
			} catch (error: any) {
				if (error?.response?.data?.erros) {
					error.response.data.erros.forEach((e: any) =>
						enqueueSnackbar(e.mensagem, { variant: 'error' }),
					);
				}
				throw error;
			}
		},
		[enqueueSnackbar],
	);

	const user = useMemo(() => {
		if (!session) return null;

		return {
			...session,
			...(session.user ?? {}),
		};
	}, [session]);

	return {
		user,
		signIn: (...args: Parameters<typeof manager.signIn>) =>
			manager.signIn(...args),
		logout: () => manager.logout(),
		manager,
		unlock,
	};
}
