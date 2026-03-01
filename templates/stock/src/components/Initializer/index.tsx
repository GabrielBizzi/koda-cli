'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@ti_torra/auth';

export function Initializer() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { manager } = useAuth();

	useEffect(() => {
		let mounted = true;

		(async () => {
			await manager.init();

			if (!mounted) return;

			const sso = searchParams.get('sso');

			if (!sso) return;

			if (manager.getSession()) {
				const url = new URL(window.location.href);
				url.searchParams.delete('sso');
				router.replace(url.pathname);
				return;
			}

			try {
				await manager.signIn({ sso });
			} finally {
				const url = new URL(window.location.href);
				url.searchParams.delete('sso');
				router.replace(url.pathname);
			}
		})();

		return () => {
			mounted = false;
		};
	}, [searchParams, router, manager]);

	return null;
}
