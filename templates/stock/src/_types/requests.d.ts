import { AxiosResponse } from 'axios';

export type ErrorResponse = {
	erros: Erro[];
};

interface Erro {
	campo: string;
	mensagem: string;
	valor: string;
	tipoErro: number;
}
interface CustomHeaders {
	'x-paginacao-total-itens': string;
	'x-paginacao-total-paginas': string;
}

interface Response<T>
	extends AxiosResponse<T> {
	headers: CustomHeaders;
}

interface ListResponse<T>
	extends AxiosResponse<{
		lista: T;
		totalItens: number;
		totalPaginas: number;
		paginacao: {
			pagina: number;
			resultados: number;
		};
		erros: Erro[];
		badRequest?: boolean;
	}> {
	headers: CustomHeaders;
}
