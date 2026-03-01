import { InputProps } from '@mui/material';
import { FieldValues, RegisterOptions } from 'react-hook-form';

type FormatedInputProps = Omit<
	InputProps,
	'name' | 'className' | 'ref' | 'onChange' | 'onBlur'
>;
export interface iInputProps extends FormatedInputProps {
	name: string | number | symbol;
	label?: string;
	registerOptions?: RegisterOptions<FieldValues, string>;
	disabled?: boolean;
	labelClasses?: string;
}
