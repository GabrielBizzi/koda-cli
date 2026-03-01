'use client';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PaginationContextType = {
	currentPage: number | undefined;
	setCurrentPage: React.Dispatch<React.SetStateAction<number | undefined>>;
	size: number | undefined;
	setSize: React.Dispatch<React.SetStateAction<number | undefined>>;
	searchParams: URLSearchParams;
	setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
	handleUpdatePaginationSize: (size: number) => void;
	handleUpdateCurrentPage: (page: number) => void;
};

const PaginationContext = createContext<PaginationContextType | undefined>(
	undefined,
);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	const [currentPage, setCurrentPage] = useState<number | undefined>(
		parseInt('1'),
	);

	const [size, setSize] = useState<number | undefined>(
		parseInt(
			(new URLSearchParams(
				typeof window !== 'undefined' ? window.location.search : '',
			).get('tamanho') as string) ?? '5',
		),
	);

	const [searchParams, setSearchParams] = useState<URLSearchParams>(
		new URLSearchParams(
			typeof window !== 'undefined' ? window.location.search : '',
		),
	);

	const handleUpdatePaginationSize = (size: number) => {
		const url = new URL(window.location.href);
		url.searchParams.set('tamanho', size.toString());
		router.replace(url.toString());
		setSize(size);
	};

	const handleUpdateCurrentPage = (page: number) => {
		setCurrentPage(page);
	};

	React.useEffect(() => {
		setSearchParams((prev) => ({
			...prev,
			tamanho: size?.toString(),
			pagina: currentPage?.toString(),
		}));
	}, [size, currentPage]);

	return (
		<PaginationContext.Provider
			value={{
				currentPage,
				setCurrentPage,
				size,
				setSize,
				searchParams,
				setSearchParams,
				handleUpdatePaginationSize,
				handleUpdateCurrentPage,
			}}
		>
			{children}
		</PaginationContext.Provider>
	);
};

export const usePagination = () => {
	const context = useContext(PaginationContext);
	if (!context) {
		throw new Error(
			'usePagination deve ser usado dentro de um PaginationProvider',
		);
	}
	return context;
};
