import { css } from '@emotion/css';
import { ErrorField } from '@ti_torra/web';
import { TextareaHTMLAttributes } from 'react';
import { Counter, TextAreaStyled } from './styles';

const textFieldClass = css`
	border: 1px solid red !important;
`;

export const TextArea = ({
	label,
	width = 'initial',
	height,
	disableDefaultStyles = false,
	type = 'text',
	placeholder,
	value,
	required = false,
	maxLength = 1500,
	textHelper,
	hasError,
	...rest
}: {
	label?: string;
	width?: string;
	height?: string;
	disableDefaultStyles?: boolean;
	type?: 'text' | 'number';
	value?: unknown;
	required?: boolean;
	textHelper?: string;
	placeholder?: string;
	hasError?: boolean;
	maxLength?: number;
} & TextareaHTMLAttributes<any>) => {
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
								font-family: var(--font-sofia-pro) !important;
								font-weight: 400;
								font-size: 1rem;
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
				<TextAreaStyled
					name={`input_${label}`}
					value={type === 'text' ? value : value}
					required={required}
					maxLength={1500}
					placeholder={`${placeholder ?? ''}${!label && required ? '' : ''}`}
					className={hasError && (textFieldClass as any)}
					{...rest}
				/>
				{textHelper || maxLength ? (
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{textHelper ? (
							<ErrorField
								error={textHelper ?? 'This field is required'}
							/>
						) : (
							<div />
						)}
						{maxLength ? (
							<Counter>
								{maxLength - (value?.toString().length ?? 0)}{' '}
								caracteres restantes.
							</Counter>
						) : (
							<div />
						)}
					</div>
				) : null}
			</div>
		</>
	);
};
