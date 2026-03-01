import { GridProps } from '@mui/material';
export type LooseAutoComplete<T extends string> = T | Omit<string, T>;

export type Column<T> = {
	name: LooseAutoComplete<keyof T>;
	label: string;
	type: 'string' | 'number';
	render?: (row: T, rows: T[]) => JSX.Element;
	columnClasses?: string;
	rowClasses?: string;
	gridOptions?: GridProps;
};

export type TableProps<T> = {
	rows: T[];
	columns: Column<T>[];
	tableClasses?: string;
	columnsClasses?: string;
	rowsClasses?: string;
	emptyComponent?: JSX.Element;
	loading?: boolean;

	gridOptions?: GridProps;

	pageSize: number;
	pages?: number;
	page?: number;
	onPageUpdate?: (page: number) => Promise<void> | void;
};
