// src/utils/envClient.ts

let cachedEnv: Record<string, string> | null = null;

async function loadEnv() {
	if (cachedEnv) return cachedEnv;

	try {
		('use server');
		const res = await fetch('/api/debug-env');
		if (!res.ok) throw new Error('Erro ao buscar envs do servidor');

		const data = await res.json();
		cachedEnv = data;

		return data;
	} catch (err) {
		console.error('Erro carregando envs:', err);
		return {};
	}
}

/**
 * Busca variáveis de ambiente runtime do Next via /api/env
 * Usa cache interno para não repetir requests
 */
export async function getEnv(key: string): Promise<string | undefined> {
	const env = await loadEnv();
	return env[key];
}

/**
 * Carrega todas as envs de uma vez (útil em inicialização de app)
 */
export async function getAllEnv(): Promise<Record<string, string>> {
	return await loadEnv();
}
