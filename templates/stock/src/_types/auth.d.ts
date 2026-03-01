import { z } from 'zod';
import { FilialSchema } from './filial';

declare global {
	export namespace AuthContext {
		export type AuthResponse = {
			autenticado: boolean;
			expiraEm: string;
			accessToken: string;
			refreshToken: string;
			criadoEm: string;
		};

		export type AuthToken = {
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
			empresas?: Empresa[];
			empresaSelecionada?: Empresa;
			filiais?: unknown[];
			criadoEm?: string;
			photo?: string;
			url?: string;

			codigoCliente?: number;
			codigoEmpresa?: number;
			codigoPerfil?: number;
			codigoUsuario?: number;
		};

		export interface Autenticado {
			autenticacao?: Autenticacao;
			usuario?: Usuario;
		}

		export interface Autenticacao {
			accessToken?: string;
			refreshToken?: string;
			expiraEm?: string;
			login?: string;
			nome?: string;
		}
		export interface Usuario {
			login: string;
			nome: string;
			cnpjFornecedor?: string;
			url?: string;
			lider: boolean;
			ativo: boolean;
			atualizarSenha: boolean;
			excluido: boolean;
			empresas: Empresa[];
			validouOTP: boolean;
			codigoUsuario: number;
			filiais?: Filial[];
		}

		export interface Empresa {
			nome: string;
			perfis: Perfil[];
			sistemas: Sistema[];
			codigoCliente: number;
			codigoEmpresa: number;
		}

		export interface Perfil {
			nome: string;
			sistemas: unknown[];
			acessos: unknown[];
			codigoPerfil: number;
		}

		export interface Sistema {
			codigoSistema: number;
			url: string;
			tag: 'Web' | 'Mobile' | string;
			sequencia: number;
			observacao: string;
			linguagens: Linguagen[];
			connectionString?: string;
		}

		export interface Linguagen {
			codigo: string;
			descricao: string;
		}
		export type Filial = z.infer<typeof FilialSchema>;
	}
}
export { };
