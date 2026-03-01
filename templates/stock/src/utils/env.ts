declare global {
	interface Window {
		__ENV__?: Record<string, string>;
	}
}

export function getEnv(key: string, fallback?: string): string {
	if (typeof window !== 'undefined' && window.__ENV__) {
		return window.__ENV__[key] || fallback || '';
	}
	return process.env[key] || fallback || '';
}
