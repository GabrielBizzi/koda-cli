export namespace Admin {
	export namespace Access {
		export type Accesses = {
			sequencia: number;
			tag: string;
			sistemas: Sistema[];
		};

		interface Sistema {
			codigoSistema: number;
			nome: string;
			tag: string;
			ativo: boolean;
			linguagens: Linguagen[];
			menus?: Menu[];
		}

		interface Menu {
			codigoMenu: number;
			linguagens: Linguagen[];
			ativo: boolean;
			sequencia: number;
			submenus?: Submenu[];
		}

		interface Submenu {
			codigoMenu: number;
			linguagens: Linguagen[];
			ativo: boolean;
			sequencia: number;
			editar?: boolean;
			exportar?: boolean;
			integrar?: boolean;
		}

		interface Linguagen {
			codigo: string;
			descricao: string;
		}
	}

	export namespace User {
		export type User = {
			login: string;
			nome: string;
			lider: boolean;
			ativo: boolean;
			excluido: boolean;
			filiais: Filiais[];
			validouOTP: boolean;
			descricaoPerfil: string;
			codigoCliente: number;
			codigoPerfil: number;
			codigoEmpresa: number;
			codigoUsuario: number;
			email?: string;
			url?: string;
			cnpjFornecedor?: string;
		};

		interface Filiais {
			codigoFilial: number;
			nome: string;
			regional?: Record<string, string | number>;
			selecionado: boolean;
		}
	}
}
