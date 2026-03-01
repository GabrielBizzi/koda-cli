import { ErrorField } from '@/components/ErrorField';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {
	Checkbox,
	FormControlProps,
	InputLabel,
	MenuItem,
	SelectChangeEvent,
	Select as SelectMui,
	SelectProps,
} from '@mui/material';
import { SelectEmpty } from '@ti_torra/web';
import React from 'react';

const StyledMenuItem = styled(MenuItem)`
	& + & {
		border-top: 1px solid var(--color-neutral-03);
	}
	color: var(--color-neutral-05);
	font-size: 16px;
	padding: inherit 16px;
	&::placeholder {
		color: var(--color-neutral-04);
	}
`;

const StyledTextItem = styled.p<{ offset: string }>`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	max-width: ${(props) => props.offset ?? 'calc(100% - 36px)'} !important;
	display: block;
	margin: 0;
`;

const StyledSelect = styled(SelectMui)<{ offset: string; minOffset?: string }>`
	color: var(--color-neutral-05);
	font-size: 16px;
	// min-width: ${(props) => props.minOffset ?? '170px'} !important;
	// max-width: ${(props) => props.offset};
	width: ${(props) => props.minOffset ?? 'auto'} !important;

	fieldset {
		height: 40px;
		top: inherit;
	}

	legend {
		display: none;
	}

	&::placeholder {
		color: var(--color-neutral-04);
	}
`;

const StyledPlaceholder = styled.p`
	margin: 0;
	font-size: 16px;
	color: var(--color-neutral-07) !important;
`;

const StyledCheckbox = styled(Checkbox)`
	padding: 0;
	margin-right: 6px;
`;

const selectClass = css`
	fieldset {
		border: 1px solid red;
	}
`;
type SelectOption<TLookup> = TLookup & { disabled?: boolean };

export type TSelect<
	TLookup,
	TValue extends React.Key | null | undefined = number | string,
> = {
	/** Define se a opção "Todos" será incluída no início da lista de opções */
	includeUndefined?: boolean;

	/** Define o tamanho máximo do Select, podendo ser redimensionado junto com o seu valor, o padrão é 100% */
	offset?: string;

	/** Define o tamanho mínimo do Select, podendo ser redimensionado junto com o seu valor, o padrão é 170px */
	minOffset?: string;

	/** Define o tamanho máximo do Select como 100%, o padrão é 10.375rem */
	fullWidth?: boolean;

	/** ID utilizado para associar o rótulo (`label`) ao campo `Select` */
	domId: string;

	/** O rótulo exibido no `Select` */
	label?: string;

	/** O valor atualmente selecionado */
	value?: TValue;

	/** O valor atualmente selecionado */
	selectRef?:
		| React.RefObject<HTMLSelectElement>
		| ((instance: HTMLSelectElement | null) => void)
		| null;

	/** Um array de objetos contendo as opções disponíveis */
	options: SelectOption<TLookup>[];

	/** Função para obter o valor de um item das opções */
	getValue(item: TLookup): TValue;

	/** Função para obter o rótulo de um item das opções */
	getLabel(item: TLookup): string;

	/** Função callback chamada quando o valor é alterado */
	onChange(e: SelectChangeEvent<unknown>): void;

	/** Props opcionais para customização do componente `FormControl` */
	formControlProps?: FormControlProps;

	/** Props opcionais para customização do componente `SelectMui` */
	selectProps?: SelectProps;

	required?: boolean;
	textHelper?: string;
	hasError?: boolean;
};

/**
 * Componente para renderização de opções.
 *
 * @param {boolean} includeUndefined - inclui a opção de valor indefinido
 *
 * @param {string} offset - Define o tamanho máximo do Select, podendo ser redimensionado junto com o seu valor, o padrão é 100%
 *
 * @param {string} minOffset - Define o tamanho mínimo do Select, podendo ser redimensionado junto com o seu valor, o padrão é 170px
 *
 * @param {boolean} fullWidth - Define o tamanho máximo do Select como 100%, o padrão é 10.375rem
 *
 * @param {string} domId - ID utilizado para associar o rótulo (`label`) ao campo `Select`
 *
 * @param {string} label - O rótulo exibido no `Select`
 *
 * @param {any} value - O valor atualmente selecionado
 *
 * @param {TLookup[]} options - Um array de objetos contendo as opções disponíveis
 *
 * @param {TLookup} getValue - Função para obter o valor de um item das opções
 *
 * @param {TLookup} getLabel - Função para obter o rótulo de um item das opções
 *
 * @param {SelectChangeEvent<unknown>} onChange - Função callback chamada quando o valor é alterado
 *
 * @param {FormControlProps} formControlProps - Props opcionais para customização do componente `FormControl`
 *
 * @param {SelectProps} selectProps - Props opcionais para customização do componente `SelectMui`
 */
export function Select<
	TLookup,
	TValue extends React.Key | null | undefined = number | string,
>({
	includeUndefined,
	children,
	domId,
	label,
	value,
	options,
	getValue,
	getLabel,
	selectRef,
	offset = '100%',
	minOffset,
	onChange,
	selectProps = {},
	required = false,
	textHelper,
	hasError,
}: React.PropsWithChildren<TSelect<TLookup, TValue>>) {
	const isMultiple = !!selectProps.multiple;
	const [multiValues, setMultiValues] = React.useState<string[]>([]);
	const ref = React.useRef(selectRef ?? null);
	const [offSet, setOffSet] = React.useState<string>(offset);
	const handleChangeMultiple = (
		event: SelectChangeEvent<typeof multiValues>,
	) => {
		const {
			target: { value },
		} = event;
		setMultiValues(typeof value === 'string' ? value.split(',') : value);
		onChange(event);
	};

	const handleSelectAll = () => {
		if (multiValues?.length === options?.length) {
			setMultiValues([]);
		} else {
			setMultiValues(
				options
					.filter((option) => option !== null && option !== undefined)
					.map((option) => getValue(option)!.toString()),
			);
		}
	};

	const renderSelectedValues = (selected: typeof multiValues) => {
		return selected
			.map((value) =>
				options.find(
					(option) =>
						option !== null &&
						option !== undefined &&
						getValue(option)!.toString() === value,
				),
			)
			.map((option) => (option ? getLabel(option) : ''))
			.join(', ');
	};

	React.useEffect(() => {
		if ((value === null || value === undefined) && isMultiple) {
			setMultiValues([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	React.useEffect(() => {
		if (ref && 'current' in ref && ref.current) {
			const computedStyle = getComputedStyle(
				ref.current as unknown as HTMLSelectElement,
			);
			const maxWidth = computedStyle.maxWidth;
			setOffSet(maxWidth);
		}
	}, [value]);

	return (
		<div
			className={css`
				display: flex;
				flex: 1 0 auto;
				flex-direction: column;
				gap: ${required && !label
					? '0.2rem'
					: required && label
						? '0.4rem'
						: '0.4rem'};
			`}
		>
			{label && (
				<InputLabel id={domId}>
					{' '}
					{`${label ?? ''}`}
					{required && (
						<span
							className={css`
								color: red;
								margin-left: 0.2rem;
								margin-bottom: 0;
							`}
						>
							*
						</span>
					)}
				</InputLabel>
			)}
			<StyledSelect
				ref={ref}
				size="small"
				variant="outlined"
				offset={offSet}
				displayEmpty={true}
				fullWidth
				minOffset={minOffset}
				placeholder={'Classificação'}
				labelId={domId}
				required={required}
				className={hasError && (selectClass as any)}
				renderValue={(v: unknown) => {
					return isMultiple ? (
						renderSelectedValues(v as string[])
					) : !value && includeUndefined ? (
						<StyledPlaceholder>Todos</StyledPlaceholder>
					) : !value && !includeUndefined ? (
						<StyledPlaceholder>{label}</StyledPlaceholder>
					) : (
						<>
							{getLabel(
								options.find(
									(option) => getValue(option) === value,
								) as any,
							) ?? v}
						</>
					);
				}}
				value={(!isMultiple ? value : multiValues) ?? ''}
				IconComponent={KeyboardArrowDownOutlinedIcon}
				onChange={!isMultiple ? onChange : handleChangeMultiple}
				{...(label ? { label } : {})}
				{...selectProps}
			>
				{includeUndefined && options?.length > 0 && (
					<StyledMenuItem
						onClick={() => {
							isMultiple ? handleSelectAll : null;
						}}
						value={undefined}
					>
						Todos
					</StyledMenuItem>
				)}
				{children}
				{!children && options?.length > 0 ? (
					options.map((option) => {
						const value = getValue(option);

						if (isMultiple) {
							return (
								<StyledMenuItem
									disabled={option.disabled}
									key={value}
									value={value?.toString()}
								>
									<StyledCheckbox
										size="small"
										checked={
											multiValues.indexOf(
												value?.toString() as unknown as string,
											) > -1
										}
									/>
									<StyledTextItem offset={offSet}>
										{getLabel(option)}
									</StyledTextItem>
								</StyledMenuItem>
							);
						}

						return (
							<StyledMenuItem
								disabled={option.disabled}
								key={value}
								value={value?.toString()}
							>
								<StyledTextItem offset={offSet}>
									{getLabel(option)}
								</StyledTextItem>
							</StyledMenuItem>
						);
					})
				) : (
					<SelectEmpty />
				)}
			</StyledSelect>
			{textHelper ? (
				<ErrorField error={textHelper ?? 'This field is required'} />
			) : null}
		</div>
	);
}
