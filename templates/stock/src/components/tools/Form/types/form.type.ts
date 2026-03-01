import React from 'react';
import { z } from 'zod';
import { FieldValues } from 'react-hook-form';
import { GridProps } from '@mui/material';

import { iInputProps } from '../components/Input/types/input.types';
import { Option, iSelectProps } from '../components/Select/types/select.type';
import { iSearchInputProps } from '../components/SearchInput/types/input.types';
import { iSwitchProps } from '../components/Switch/types/switch.type';

export type Input<T extends FieldValues> = (
	| ({
		type: 'number' | 'text' | 'email' | 'password';
		name: keyof T;
	} & iInputProps)
	| ({
		type: 'search';
		name: keyof T;
	} & iSearchInputProps)
	| ({
		type: 'select';
		name: keyof T;
		options?: Option[];
	} & iSelectProps)
	| ({
		type: 'switch';
		name: keyof T;
	} & iSwitchProps)

) & { grid?: GridProps };

export interface iFormProps<T extends FieldValues> {
	children?: JSX.Element;
	handleSubmit: (data: T) => void | Promise<void>;
	zodSchema?: z.Schema<T>;
	inputs?: Input<T>[];
	formDirection?: 'row' | 'column';
	onResetForm?: React.FormEventHandler<HTMLFormElement>;
	disableSetParams?: boolean;
	formname?: string;
	gridOptions?: GridProps;
}
