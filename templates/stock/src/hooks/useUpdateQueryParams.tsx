'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useUpdateQueryParam = <T extends Record<string, any>>() => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const updateQueryParam = useCallback(
		(key: keyof T, value: string | number | undefined) => {
			if (typeof value === 'undefined') return;

			const params = new URLSearchParams(searchParams.toString());
			params.set(String(key), String(value));

			router.push(`${pathname}?${params.toString()}`);
		},
		[pathname, router, searchParams],
	);

	const getQueryParam = useCallback(
		(key: keyof T) => {
			return searchParams.get(String(key));
		},
		[searchParams],
	);

	const getQueryParams = useCallback(() => {
		const params: Record<string, string> = {};
		searchParams.forEach((value, key) => {
			params[key] = value;
		});
		return params;
	}, [searchParams]);

	const removeQueryParam = useCallback(
		(key: keyof T) => {
			const params = new URLSearchParams(searchParams.toString());
			params.delete(String(key));

			const newUrl =
				params.toString().length > 0
					? `${pathname}?${params.toString()}`
					: pathname;

			router.replace(newUrl);
		},
		[pathname, router, searchParams],
	);

	return {
		updateQueryParam,
		getQueryParam,
		getQueryParams,
		removeQueryParam,
	};
};
