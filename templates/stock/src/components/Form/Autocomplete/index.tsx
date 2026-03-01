'use client';
import { css } from '@emotion/css';
import {
	Autocomplete,
	CircularProgress,
	TextField as TextFieldAutoComplete,
	TextFieldProps,
} from '@mui/material';
import { ErrorField } from '@ti_torra/web';
import { useEffect, useMemo, useRef, useState } from 'react';

const textFieldClass = css`
	fieldset {
		border: 1px solid red;
	}
`;

type Option = { id: number | string; label: string };

export const AutoSelect = ({
	label,
	width = 'initial',
	height,
	disableDefaultStyles = false,
	options,
	disabled = false,
	valueId, // << id controlado externamente
	onInputChange, // (e, value, reason)
	onChangeId, // (id, option)
	required = false,
	textHelper,
	placeholder,
	hasError,
	loading = false,
	initialLabel, // << opcional: label inicial (ex.: do selectedRow)
	...rest
}: {
	label?: string;
	width?: string;
	height?: string;
	disabled?: boolean;
	disableDefaultStyles?: boolean;
	options: Option[];
	valueId?: number | string | null;
	onInputChange?: (e: any, value: string, reason: string) => void;
	onChangeId?: (id: number | string | null, option?: Option | null) => void;
	required?: boolean;
	textHelper?: string;
	placeholder?: string;
	hasError?: boolean;
	loading?: boolean;
	initialLabel?: string; // << ajuda no primeiro render
} & TextFieldProps) => {
	// cache "sticky" do option selecionado
	const stickyRef = useRef<Option | null>(null);

	// controla o texto do input independente do value
	const [inputValue, setInputValue] = useState<string>('');

	// Se houver label inicial e ainda não temos sticky, inicia
	useEffect(() => {
		if (stickyRef.current == null && valueId != null && initialLabel) {
			stickyRef.current = { id: valueId, label: initialLabel };
			setInputValue(initialLabel);
		}
	}, [valueId, initialLabel]);

	// option encontrado nas options atuais
	const foundOption = useMemo(() => {
		return (
			options.find((o) => String(o.id) === String(valueId ?? '')) ?? null
		);
	}, [options, valueId]);

	// valor efetivo do Autocomplete:
	// - se achou nas options, usa e atualiza o cache
	// - senão, mantém o último selecionado (sticky)
	const value: Option | null = useMemo(() => {
		if (foundOption) {
			stickyRef.current = foundOption;
			return foundOption;
		}
		// mantém o selecionado mesmo se sumir da lista
		if (
			stickyRef.current &&
			String(stickyRef.current.id) === String(valueId ?? '')
		) {
			return stickyRef.current;
		}
		return null;
	}, [foundOption, valueId]);

	return (
		<div
			className={
				disableDefaultStyles
					? css`
							width: ${width};
							max-height: ${height};
						`
					: css`
							display: flex;
							flex: 1 0 auto;
							flex-direction: column;
							gap: 0.5rem;
							width: ${width};
							max-height: ${height};
						`
			}
		>
			{label ? (
				<div style={{ display: 'flex' }}>
					<label
						style={{ color: 'rgba(0,0,0,.6)' }}
						className={css`
							font-family: Sofia Pro;
							font-weight: 400;
							font-size: 1rem;
							line-height: 1.4375em;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							max-width: 100%;
						`}
						htmlFor={`input_${label}`}
					>
						{label}
						{required && (
							<span style={{ color: 'red', marginLeft: 4 }}>
								*
							</span>
						)}
					</label>
				</div>
			) : null}

			<Autocomplete<Option, false, false, false>
				fullWidth
				size="small"
				className={hasError && (textFieldClass as any)}
				sx={{ flex: '1 0 auto', width: '100%' }}
				options={options}
				value={value}
				disabled={disabled}
				inputValue={inputValue}
				onInputChange={(e, v, reason) => {
					setInputValue(v); // controla o texto
					onInputChange?.(e, v, reason); // dispara sua busca (com reason)
				}}
				onChange={(_e, newValue) => {
					// ao selecionar, atualiza cache, id e texto
					stickyRef.current = newValue ?? null;
					setInputValue(newValue?.label ?? '');
					onChangeId?.(newValue?.id ?? null, newValue ?? null);
				}}
				getOptionLabel={(opt) => opt?.label ?? ''}
				isOptionEqualToValue={(opt, val) =>
					String(opt.id) === String(val.id)
				}
				loading={loading}
				renderInput={(params) => (
					<TextFieldAutoComplete
						name={`input_${label}`}
						required={required}
						placeholder={`${placeholder ?? ''}${!label && required ? '*' : ''}`}
						className={hasError && (textFieldClass as any)}
						{...rest}
						{...params}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<>
									{loading ? (
										<CircularProgress size={18} />
									) : null}
									{params.InputProps.endAdornment}
								</>
							),
						}}
					/>
				)}
			/>

			{textHelper ? <ErrorField error={textHelper} /> : null}
		</div>
	);
};
