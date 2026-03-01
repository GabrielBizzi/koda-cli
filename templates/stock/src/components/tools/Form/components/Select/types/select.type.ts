import { InputAction, Props, MultiValue } from 'react-select';
export type Option = { label: string | number; value: string | number };

export type iSelectProps = {
	name: string | number | symbol;
	label?: string;
	options: Option[];
	/** Altera o modo de exibição, não abrindo o dropdown quando o input possuir menos de 3 opções*/
	isApiSearch?: boolean;
	isLoading?: boolean;
	placeholder?: string;
	/** Executado ao selecionar uma opção */
	onSelectOption?: (value: Option | MultiValue<Option> | null) => void;
	/** Executado ao escrever no input */
	handleInputChange?: (newValue: string, actionMeta: InputAction) => void;
	defaultValue?: Option | null;
	isDisabled?: boolean;
	maxMenuHeight?: number;
	noOptionsMessage?: string;

	containerClasses?: string;
} & Omit<Props, 'name' | 'label' | 'options'>;
