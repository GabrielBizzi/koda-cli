import React from 'react';
import { InputProps } from '@mui/material';
import { FieldValues, RegisterOptions } from 'react-hook-form';

type FormatedInputProps = Omit<
	InputProps,
	'name' | 'className' | 'ref' | 'onChange' | 'onBlur'
>;
export interface iSearchInputProps extends FormatedInputProps {
	name: string | number | symbol;
	label?: string;
	registerOptions?: RegisterOptions<FieldValues, string>;
	disabled?: boolean;
	formname?: string;
	formref?: React.RefObject<HTMLFormElement>;
}
