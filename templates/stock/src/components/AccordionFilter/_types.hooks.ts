import React, {
	CSSProperties,
	Dispatch,
	InputHTMLAttributes,
	SetStateAction,
	SyntheticEvent,
} from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TSearchProps } from '../Form/Search/types.zod';
import { ResponsiveProp } from '@ti_torra/web/dist/@types/responsive';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	labelPlacement?: string;
	width?: number;
	label?: string;
	type?: 'text' | 'date' | 'select' | 'number';
	options?: object[];
	messageErrorOnBlur?: string;
	iconError?: string;
	placeholder?: string;
	sm?: ResponsiveProp;
	xl?: ResponsiveProp;
	lg?: ResponsiveProp;
	md?: ResponsiveProp;
	isRequired?: boolean;
	display?: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
	styles?: CSSProperties;
	onClickEvent?: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	labelCheckbox?: string;
	onChangeEvent?: (event: any) => void;
	errors?: {
		[key: string]: string | undefined;
	};
	hasError?: boolean;
	textHelper?: string;
}

interface SelectInputProps extends BaseInputProps {
	type: 'select';
	options: object[];
	getLabel: string;
	getValue: string | number;
}

export type InputProps =
	| BaseInputProps
	| SelectInputProps;

interface SearchProps extends TSearchProps<any> {
	sm?: ResponsiveProp;
	xl?: ResponsiveProp;
	lg?: ResponsiveProp;
	md?: ResponsiveProp;
}

export interface IAccordionFiltersProps {
	id?: string;
	styles?: CSSProperties;
	propagation?: boolean;
	closable?: boolean;
	defaultOpened?: boolean;
	onChange?: (
		id: string,
	) => (_event: SyntheticEvent, isExpanded: boolean) => Promise<void>;
	onClose?: (id: string) => Promise<void>;
	onOpen?: (id: string) => Promise<void>;
	inputs?: InputProps[];
	form: UseFormReturn<any>;
	onSubmit?: (values: any) => void;
	tabStatus?: Array<{
		value: string | number;
		label: string;
	}>;
	hideInputs?: boolean;
	SearchProps?: Partial<SearchProps>;
	setValueTab?: Dispatch<SetStateAction<number>>;
}
