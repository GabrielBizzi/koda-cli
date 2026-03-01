'use client';

import { DefaultRoutes } from '@/common/DefaultRoutes.ts';
import { destroyCookie } from 'nookies';
import { redirect } from 'next/navigation';

/**
 * @description Esse metodo serve para deslogar o usuário.
 *
 * Ele apaga o cookie Auth.Token e redireciona para a tela de login.
 * Caso seja chamado no SSR, usa `redirect` direto (Next.js server navigation).
 * Caso seja chamado no client, usa `window.location.href`.
 */
export const signOut = (
	options: { redirect: boolean } = { redirect: true },
) => {
	destroyCookie(null, 'Auth.Token', {
		path: '/',
	});

	if (options.redirect) {
		if (typeof window !== 'undefined') {
			window.location.href = DefaultRoutes.login;
		} else {
			redirect(DefaultRoutes.login);
		}
	}
};
