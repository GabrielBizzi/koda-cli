import { Dispatch, SetStateAction } from 'react';

export type SignInResult =
	| { status: 'Success'; user: AuthContextNS.AuthToken }
	| {
			status: 'PendingOTP';
			loginPayload: { login: string; senha: string };
			qrCode: string;
	  }
	| { status: 'RequestOTP'; loginPayload: { login: string; senha: string } }
	| { status: 'AlterPassword'; user?: AuthContextNS.AuthToken };

export interface SignInCredentials {
	login: string;
	password: string;
	otp?: string;
	redirect?: boolean;
}

export namespace AuthContextNS {
	export type Perfil = {
		nome: string;
		sistemas: unknown[];
		acessos: unknown[];
		codigoPerfil: number;
	};

	export type Linguagen = {
		codigo: string;
		descricao: string;
	};

	export type Sistema = {
		codigoSistema: number;
		url: string;
		tag: 'Web' | 'Mobile';
		sequencia: number;
		observacao: string;
		linguagens: Linguagen[];
		connectionString?: string;
	};

	export type Empresa = {
		nome: string;
		perfis: Perfil[];
		sistemas: Sistema[];
		codigoCliente: number | null;
		codigoEmpresa: number | null;
	};

	export type AuthResponse = {
		accessToken: string;
		refreshToken: string;
		login: string;
		empresas?: Empresa[];
		expiresIn?: number;
	};

	export type UsuarioAutenticado = {
		autenticado?: true;
		expiraEm?: string;
		accessToken?: string;
		refreshToken?: string;
		login?: string;
		nome?: string;
		lider?: boolean;
		ativo?: boolean;
		atualizarSenha?: boolean;
		excluido?: boolean;
		empresaSelecionada?: Empresa;
		filiais?: unknown[];
		criadoEm?: string;
		photo?: string;
		url?: string;
		codigoCliente?: number;
		codigoEmpresa?: number;
		codigoPerfil?: number;
		codigoUsuario?: number;
		empresas: Empresa[];
	};

	export type AuthToken = AuthResponse &
		UsuarioAutenticado & {
			empresaSelecionada?: Empresa | null;
		};
}

export type InitialValue = {
	signIn(credentials: SignInCredentials): Promise<SignInResult>;
	unlock(credentials: SignInCredentials): Promise<SignInResult>;
	signOut(options?: { redirect?: boolean }): void;
	reAuthenticate(
		payload: AuthContextNS.AuthToken,
	): Promise<AuthContextNS.AuthResponse | undefined>;
	user: AuthContextNS.AuthToken | null;
	setUser: Dispatch<SetStateAction<AuthContextNS.AuthToken | null>>;
	isAuthenticated: boolean;
};
