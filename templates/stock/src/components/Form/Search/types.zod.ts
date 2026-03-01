import { ColumnProps } from '@/components/Table';
import { ButtonBaseOwnProps, ButtonOwnProps } from '@mui/material';

export type TSearchButton = {
	text?: string;
} & ButtonOwnProps;

export type TGearButton = {
	text?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonBaseOwnProps;

export type TableDialogProps<T extends object> = React.PropsWithChildren<{
	open?: boolean;
	columns: ColumnProps<T>[];
	disablePagination?: boolean;
	currentPageSize?: number;
	autoPaginateOnChange?: boolean;
	onCancel?: () => void;
	onCommit: (props: {
		columns: ColumnProps<T>[];
		pagination: number;
	}) => void;
}>;

export type TSearchProps<T extends object> = {
	onClickSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
	searchButtonProps?: TSearchButton;
	hasGearButton?: boolean;
	exportable?: boolean;
	onExport?: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => Promise<void> | void | any;
	gearButtonProps?: TGearButton;
	dialogProps?: TableDialogProps<T>;
};

export const defaultValuesSearch: TSearchButton = {
	text: 'Pesquisar',
	fullWidth: true,
	color: 'primary',
	variant: 'contained',
} as TSearchButton;

export const defaultValuesGear: TGearButton = {
	text: 'Configuração',
	'aria-label': 'Configuração',
	type: 'button',
	disableRipple: true,
} as TGearButton;
