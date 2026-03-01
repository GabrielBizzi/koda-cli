import axios from 'axios';
import { SYSTEM_CODE } from './systemCode';
import { AuthContextNS } from '@/_types/AuthContext';

const reAuthApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export async function reAuthenticate(auth: any, reset: () => void) {
	try {
		const response = await reAuthApi.post<AuthContextNS.AuthResponse>(
			`/Auth/v1/Autenticacao/refresh-token`,
			{
				login: auth.login,
				refreshToken: auth?.refreshToken,
				codigoCliente: auth.empresas[0].codigoCliente ?? 1,
				codigoEmpresa: auth.empresas[0].codigoEmpresa ?? 1,
				codigoSistema: SYSTEM_CODE,
			},
		);
		return response.data;
	} catch (error) {
		reset();
		throw new Error('Erro na reautenticação');
	}
}
