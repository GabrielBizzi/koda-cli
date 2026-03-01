import { ErrorField } from '@/components/ErrorField';
import { css } from '@emotion/css';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import React from 'react';

const textFieldClass = css`
	font-size: 0.875rem !important;
	fieldset {
		border: 1px solid red;
	}
	font-family: var(--font-montserrat);
`;

const textFieldClassNoError = css`
	font-size: 0.875rem !important;
	font-family: var(--font-montserrat);
`;

export const TextField = ({
	label,
	width = 'initial',
	height,
	disableDefaultStyles = false,
	type = 'text',
	placeholder,
	value,
	required = false,
	textHelper,
	hasError,
	...rest
}: {
	label?: string;
	width?: string;
	height?: string;
	disableDefaultStyles?: boolean;
	type?: 'text' | 'number' | 'password';
	value?: unknown;
	required?: boolean;
	textHelper?: string;
	placeholder?: string;
	hasError?: boolean;
} & OutlinedInputProps) => {
	return (
		<>
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
								gap: ${required && !label
									? '0.2rem'
									: required && label
									? '0.5rem'
									: '0.5rem'};
								width: ${width};
								max-height: ${height};
						  `
				}
			>
				{label ? (
					<div
						style={{
							display: 'flex',
						}}
					>
						<label
							style={{ color: 'rgba(0, 0, 0, 0.6)' }}
							className={css`
								font-family: var(--font-montserrat);
								font-weight: 400;
								font-size: 0.825rem;
								line-height: 1.4375em;
								padding: 0;
								position: relative;
								display: block;
								transform-origin: top left;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								max-width: 100%;
							`}
							htmlFor={`input_${label}`}
						>
							{label}
						</label>
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
					</div>
				) : null}
				<OutlinedInput
					name={`input_${label}`}
					size="small"
					sx={{ flex: '1 0 auto', width: '100%' }}
					type={type}
					value={type === 'text' ? value : value}
					required={required}
					placeholder={`${placeholder ?? ''}${
						!label && required ? '*' : ''
					}`}
					className={
						hasError
							? (textFieldClass as any)
							: (textFieldClassNoError as any)
					}
					{...rest}
				/>
				{textHelper ? (
					<ErrorField
						error={textHelper ?? 'This field is required'}
					/>
				) : null}
			</div>
		</>
	);
};
