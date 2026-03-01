'use client';
import { ColumnProps } from '@/components/Table/types.zod';
import exportData from '@/exporters/excel.export';
import { CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { createContext, PropsWithChildren, useContext } from 'react';

export type TExport<T> = {
	exporting: boolean;
	startExport: (
		column: Partial<ColumnProps<T>>[],
		totalPages: number,
		callback: (pages: number) => void,
		name?: string,
	) => void;
};

export const ExportContext = createContext<TExport<unknown> | undefined>(
	undefined,
);

export const ExportProvider = <T,>({ children }: PropsWithChildren) => {
	const [exporting, setExporting] = React.useState(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const startExport = async (
		columnsToExport: Partial<ColumnProps<T>>[],
		totalPages: number,
		callback: (pages: number) => void | T[],
		name: string = 'spreadsheet',
	) => {
		setExporting(true);
		const snackbar = enqueueSnackbar(
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '3px 5px',
					color: '#fff',
				}}
			>
				<CircularProgress size="1rem" color="inherit" />
				<p
					style={{
						margin: 0,
						marginLeft: '1rem',
					}}
				>
					Realizando exportação
				</p>
			</div>,
			{
				variant: 'exporter',
				preventDuplicate: true,
				hideIconVariant: true,
				persist: true,
			},
		);

		try {
			let allData: T[] = [];

			for (let i = 1; i <= totalPages; i++) {
				const rows = (await callback(i)) as T[];

				allData = allData.concat(rows);

				await new Promise((resolve) => setTimeout(resolve, 500));
			}

			const isInvalidData =
				allData.length === 1 && typeof allData[0] === 'number';

			if (isInvalidData) return;

			exportData(allData, columnsToExport, name);

			enqueueSnackbar('Exportado com sucesso!', {
				variant: 'success',
				preventDuplicate: true,
			});
		} catch (error) {
			console.error('Erro ao exportar dados', error);
		} finally {
			closeSnackbar(snackbar);
			setExporting(false);
		}
	};

	const value = {
		exporting,
		startExport,
	};

	return (
		<ExportContext.Provider value={value}>
			{children}
		</ExportContext.Provider>
	);
};

export const useExport = <T,>() => {
	const context = useContext(ExportContext);
	if (!context) {
		throw new Error('useExport must be used within an ExportProvider');
	}
	return context as TExport<T>;
};
