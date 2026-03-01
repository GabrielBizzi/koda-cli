import { OutlinedInputProps } from '@mui/material';

export type FilterMainSearchProps = OutlinedInputProps & {
	onSearch(): void;
	icon?: boolean;
	required?: boolean;
	textHelper?: string;
	hasError?: boolean;
	width?: string;
	height?: string;
};
