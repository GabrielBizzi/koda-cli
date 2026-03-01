import { usePagination } from '@/context/pagination.context';
import styled from '@emotion/styled';
import {
	ArrowBack,
	ArrowForward,
	FirstPage,
	LastPage,
} from '@mui/icons-material';
import { Pagination, PaginationItem, PaginationProps } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { AxiosResponse } from 'axios';
import React from 'react';
import { z } from 'zod';

export const StyledPagination = styled(Pagination)`
	flex: 1 1 auto;
	padding: 1rem;
	display: flex;
	justify-content: center;

	& .MuiPagination-ul {
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(10px);
		border-radius: 18px;
		padding: 8px 12px;
		gap: 6px;
	}

	& .MuiPaginationItem-root {
		border-radius: 12px;
		min-width: 38px;
		height: 38px;
		font-weight: 500;
		transition: all 0.25s ease;
		color: rgba(255, 255, 255, 0.75);
	}

	& .MuiPaginationItem-root:hover {
		background: rgba(99, 102, 241, 0.15);
		transform: translateY(-2px);
	}

	& .Mui-selected {
		background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
		color: #fff !important;
		box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
		font-weight: 600;
	}

	& .MuiPaginationItem-icon {
		font-size: 20px;
	}
`;
export function ListPagination(
	props: PaginationProps & {
		search: URLSearchParams;
		totalPages: number;
		callback?: (page?: number) => void;
	},
) {
	const { handleUpdateCurrentPage, currentPage, setCurrentPage } =
		usePagination();

	React.useEffect(() => {
		setCurrentPage(props.page ?? 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.page]);

	return (
		<StyledPagination
			count={props.totalPages}
			showFirstButton={Number(props.totalPages) > 5}
			showLastButton={Number(props.totalPages) > 5}
			siblingCount={1}
			boundaryCount={1}
			page={+currentPage!}
			onChange={(_e, page) => {
				handleUpdateCurrentPage(page);
				props.callback && props.callback(page);
			}}
			renderItem={(item) => (
				<PaginationItem
					style={{
						listStyle: 'none !important',
					}}
					slots={{
						previous: ArrowBack,
						next: ArrowForward,
						first: FirstPage,
						last: LastPage,
					}}
					{...item}
				/>
			)}
			{...props}
		/>
	);
}

export const PaginationSchema = z.object({
	totalItems: z.number().optional(),
	totalPages: z.number().optional(),
	page: z.number().optional(),
	results: z.number().optional(),
	nextPage: z.number().optional(),
});

export const Paginacaochema = z.object({
	totalItems: z.number().optional(),
	totalPaginas: z.number().optional(),
	pagina: z.number().optional(),
	resultados: z.number().optional(),
	nextPage: z.number().optional(),
});

export const ResultadoListObjSchema = <TSchema extends z.ZodRawShape>(
	schema: z.ZodObject<TSchema>,
): z.ZodObject<{
	badRequest: z.ZodBoolean;
	erros: z.ZodArray<z.ZodAny>;
	lista: z.ZodOptional<z.ZodArray<z.ZodObject<TSchema>>>;
	paginacao: z.ZodOptional<typeof Paginacaochema>;
	totalItens: z.ZodOptional<z.ZodNumber>;
	totalPaginas: z.ZodOptional<z.ZodNumber>;
}> =>
	z.object({
		badRequest: z.boolean(),
		erros: z.array(z.any()),
		lista: z.array(schema).optional(),
		paginacao: Paginacaochema.optional(),
		totalItens: z.number().optional(),
		totalPaginas: z.number().optional(),
	});

export const ResultadoListSchema = <TSchema extends z.ZodRawShape>(
	schema: z.ZodObject<TSchema>,
): z.ZodObject<{
	badRequest: z.ZodBoolean;
	erros: z.ZodArray<z.ZodAny>;
	conteudo: z.ZodOptional<z.ZodArray<z.ZodObject<TSchema>>>;
	pagination: z.ZodOptional<typeof PaginationSchema>;
}> =>
	z.object({
		badRequest: z.boolean(),
		erros: z.array(z.any()),
		conteudo: z.array(schema).optional(),
		pagination: PaginationSchema.optional(),
	});

export const ResultadoObjectSchema = <TSchema extends z.ZodRawShape>(
	schema: z.ZodObject<TSchema>,
) =>
	z.object({
		badRequest: z.boolean(),
		erros: z
			.array(
				z.object({
					campo: z.string(),
					mensagem: z.string(),
					tipoErro: z.number(),
				}),
			)
			.optional(),
		conteudo: schema.optional(),
		pagination: PaginationSchema.optional(),
	});

export const SidebarSchema = z.object({
	codigoMenu: z.number().optional(),
	linguagens: z
		.array(
			z.object({
				codigo: z.string().optional(),
				descricao: z.string().optional(),
			}),
		)
		.optional(),
	sequencia: z.number().optional(),
	submenus: z
		.array(
			z.object({
				codigoMenu: z.number().optional(),
				linguagens: z
					.array(
						z.object({
							codigo: z.string().optional(),
							descricao: z.string().optional(),
						}),
					)
					.optional(),
				pagina: z.string().nullable().optional(),
				sequencia: z.number().optional(),
				icone: z.string().optional(),
				editar: z.boolean().optional(),
				exportar: z.boolean().optional(),
				integrar: z.boolean().optional(),
				criadoPor: z.number().optional(),
				criadoEm: z.string().optional(),
			}),
		)
		.nullable()
		.optional(),
	criadoPor: z.number().optional(),
	criadoEm: z.string().optional(),
	icone: z.string().optional(),
	pagina: z.string().optional(),
});

export const UsuarioDataSchema = z.object({
	login: z.string().optional(),
	nome: z.string().optional(),
	email: z.string().optional(),
	url: z.string().optional(),
	lider: z.boolean().optional(),
	ativo: z.boolean().optional(),
	atualizarSenha: z.boolean().optional(),
	excluido: z.boolean().optional(),
	filiais: z
		.array(
			z.object({
				codigoFilial: z.number().optional(),
				nome: z.string().optional(),
				selecionado: z.boolean().optional(),
			}),
		)
		.optional(),
	validouOTP: z.boolean().optional(),
	codigoCliente: z.number().optional(),
	codigoEmpresa: z.number().optional(),
	codigoUsuario: z.number().optional(),
});

export const ResultadoIntegracaoListSchema = <TSchema extends z.ZodRawShape>(
	schema: z.ZodObject<TSchema>,
) =>
	z.object({
		success: z.boolean(),
		message: z.string().optional(),
		conteudo: z
			.object({
				items: z.array(schema).optional(),
				paginas: z.number().optional(),
				tamanho: z.number().optional(),
				totalItens: z.number().optional(),
				success: z.boolean().optional(),
			})
			.optional(),
		validationErrors: z
			.array(
				z.object({
					propertyName: z.string().optional(),
					errorMessage: z.string().optional(),
					severity: z.number().optional(),
				}),
			)
			.optional(),
	});

export function formatDate(date: string) {
	const d = new Date(date);
	return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()} `;
}

interface CustomHeaders {
	'x-paginacao-total-itens': string;
	'x-paginacao-total-paginas': string;
}

interface Response<T> extends Omit<AxiosResponse<T>, 'headers'> {
	headers: CustomHeaders;
}

type PagindoIntegracao<T> = {
	items?: Array<T>;
	paginas?: number;
	tamanho?: number;
	totalItens?: number;
	success?: boolean;
};

type PaginadoCommon<T> = {
	conteudo?: Array<T>;
	pagination?: {
		totalItems?: number;
		totalPages?: number;
		page?: number;
		results?: number;
		nextPage?: number;
	};
	badRequest: boolean;
	erros: Array<any>;
};

export type PaginadoPopup<T> = {
	lista?: Array<T>;
	paginacao?: {
		pagina?: number;
		resultados?: number;
	};
	totalItens?: number;
	totalPaginas?: number;
	nextPage?: number;
	badRequest: boolean;
	erros: Array<any>;
};

export function readPaginadoIntegracao<T = unknown>(
	content: PagindoIntegracao<T>,
	cb: (data: { totalPaginas: number; pagina: number }) => void,
) {
	cb({
		totalPaginas: Math.ceil(+(content.totalItens! / content.tamanho!)) ?? 0,
		pagina: content.paginas ?? 1,
	});
	return {
		totalPaginas: Math.ceil(+(content.totalItens! / content.tamanho!)) ?? 0,
		pagina: content.paginas ?? 1,
	};
}

export function readPaginadoDefault<T = unknown>(
	obj: Response<T>,
	cb: (data: { totalPaginas: number }) => void,
) {
	cb({
		totalPaginas:
			(obj.headers['x-paginacao-total-paginas'] as unknown as number) ??
			0,
	});
	return {
		totalPaginas:
			(obj.headers['x-paginacao-total-paginas'] as unknown as number) ??
			0,
	};
}

export function readPaginadoHeader<T = unknown>(
	obj: PaginadoCommon<T>,
	cb: (data: { totalPaginas: number; pagina: number }) => void,
) {
	cb({
		totalPaginas:
			Math.ceil(
				+(obj.pagination?.totalItems! / obj.pagination?.results!),
			) ?? 0,
		pagina: obj.pagination?.page ?? 1,
	});
	return {
		totalPaginas:
			Math.ceil(
				+(obj.pagination?.totalItems! / obj.pagination?.results!),
			) ?? 0,
		pagina: obj.pagination?.page ?? 1,
	};
}

export function readPaginadoPopup<T = unknown>(
	obj: PaginadoPopup<T>,
	cb: (data: { totalPaginas: number; pagina: number }) => void,
) {
	cb({
		totalPaginas:
			Math.ceil(+(obj?.totalItens! / obj?.paginacao?.resultados!)) ?? 0,
		pagina: obj?.paginacao?.pagina ?? 1,
	});
	return {
		totalPaginas:
			Math.ceil(+(obj.totalItens! / obj?.paginacao?.resultados!)) ?? 0,
		pagina: obj?.paginacao?.pagina ?? 1,
	};
}

export const Actions = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;
	padding: 1.35rem 0;
	gap: 10px;
`;

export const DateInput = styled(DateField)`
	max-height: 40px;
	height: 40px !important;
`;
