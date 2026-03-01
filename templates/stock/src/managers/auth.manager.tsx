import { getUserBranchs } from '@/functions/branchs.functions';
import { loadSidebar } from '@/functions/sidebar.functions';
import { api } from '@/services/api';
import { SYSTEM_CODE } from '@/utils/systemCode';
import { AuthManager, WebStorageAdapter } from '@ti_torra/auth';
import dayjs from 'dayjs';
import { setCookie } from 'nookies';

type SsoRaw = any;

export const authManager = new AuthManager<'sso', SsoRaw>({
	storage: new WebStorageAdapter(),
	httpClient: api,
	mode: 'sso',
	endpoints: {
		sso: '/Auth/v1/Autenticacao/authenticate',
		authenticatedUser: '/Admin/v1/Usuario/Autenticado',
		refresh: '/Auth/v1/Autenticacao/refresh-token',
	},

	sessionMapper: (data) => {
		const token = data?.autenticacao?.accessToken;
		const refreshToken = data?.autenticacao?.refreshToken;
		const usuario = data?.usuario;

		if (!token || !usuario?.codigoUsuario) {
			throw new Error('SSO inválido');
		}

		return {
			accessToken: token,
			refreshToken,
			login: usuario.login,
			user: usuario,
			empresas: usuario.empresas,
			empresaSelecionada: usuario.empresas?.[0] ?? null,
			filiais: [],
			expiresAt: usuario?.expiraEm
				? new Date(usuario.expiraEm).getTime()
				: Date.now() + (data.autenticacao?.expiresIn ?? 3600) * 1000,
		};
	},

	refreshBodyMapper: (s) => ({
		login: s.login,
		refreshToken: s.refreshToken,
		codigoCliente: s.empresaSelecionada?.codigoCliente,
		codigoEmpresa: s.empresaSelecionada?.codigoEmpresa,
		codigoSistema: SYSTEM_CODE,
	}),

	refreshMerger: (current, raw) => ({
		...current,
		accessToken: raw.accessToken,
		refreshToken: raw.refreshToken,
		expiresAt: raw.expiraEm
			? new Date(raw.expiraEm).getTime()
			: Date.now() + (raw.expiresIn ?? 3600) * 1000,
	}),
});

authManager.onPostAuth(async (session) => {
	api.defaults.headers.Authorization = `Bearer ${session.accessToken}`;
});

authManager.onPostAuth(async (session) => {
	if (!session.user?.codigoUsuario) return;
	if (session.filiais && session.filiais.length > 0) return;

	const filiais = await getUserBranchs(
		session.accessToken,
		session.user.codigoUsuario,
	);

	await authManager.updateSession({ filiais });
});

authManager.onPostAuth(async (session) => {
	await loadSidebar(session.accessToken);
});

authManager.onPostAuth(async (session) => {
	setCookie(undefined, 'Auth.Token', session.accessToken, {
		maxAge: 60 * 60,
		expires: dayjs().add(1, 'hour').toDate(),
		path: '/',
	});
});
