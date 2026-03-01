import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

async function apiClient(
	_ctx: GetServerSidePropsContext | undefined = undefined,
) {
	return api;
}

function mapPaginadoIntegracaoArray(item: [string, unknown]) {
	if (item[0] === 'pagina') return ['paginas', item[1]];
	if (item[0] === 'resultados') return ['tamanho', item[1]];
	return item;
}

function mapPaginadoArray(item: [string, unknown]) {
	if (item[0] === 'pagina') return ['pagina', item[1]];
	if (item[0] === 'tamanho') return ['tamanho', item[1]];
	return item;
}

export function buildIntegracaoFilter(search: Record<string, unknown>) {
	return Object.entries(search)
		.filter(([key]) => key !== 'sso')
		.map(mapPaginadoIntegracaoArray)
		.reduce((filter, [key, value]) => {
			if (typeof value !== 'undefined' && value !== null) {
				filter.append(key as string, value.toString());
			}
			return filter;
		}, new URLSearchParams());
}

export function buildFilter(search: Record<string, unknown>) {
	return Object.entries(search)
		.filter(([key]) => key !== 'sso')
		.map(mapPaginadoArray)
		.reduce((filter, [key, value]) => {
			if (typeof value !== 'undefined' && value !== null) {
				filter.append(key as string, value.toString());
			}
			return filter;
		}, new URLSearchParams());
}

export { api, apiClient };
