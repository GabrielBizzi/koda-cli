import { SwitchProps } from '@mui/material';

export interface iSwitchProps extends SwitchProps {
	name: string;
	label?: string;
	type: 'switch';
	isDisabled?: boolean;
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => void;
}
