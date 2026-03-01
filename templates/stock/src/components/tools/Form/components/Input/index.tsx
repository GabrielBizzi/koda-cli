import React from 'react';
import { useFormContext } from 'react-hook-form';
// import { useSearch } from '@tanstack/react-router';

import { iInputProps } from './types/input.types';
import { getErrorMessage } from './utils/get-errors';
import {
	ErrorMessageContainer,
	InputContainer,
	InputLabel,
	StyledInput,
} from './styles';
import { css, cx } from '@emotion/css';

const Input: React.FC<iInputProps> = ({
	label,
	name,
	registerOptions,
	disabled,
	required,
	defaultValue,
	labelClasses,
	...rest
}) => {
	const {
		register,
		formState: { errors, isSubmitting },
		clearErrors,
	} = useFormContext();
	// const params: Record<string, string> = useSearch({ strict: false });

	const fieldError = React.useMemo(
		() => getErrorMessage(errors, name.toString()),
		[errors, name],
	);
	return (
		<InputContainer>
			{label && (
				<InputLabel
					className={cx(
						'font_title_xs',

						labelClasses,
					)}
					htmlFor={`${name.toString()}`}
				>
					{label}
					{required && (
						<span
							className={css`
								color: red;
							`}
						>
							*
						</span>
					)}
				</InputLabel>
			)}
			<StyledInput
				id={`input_${name.toString()}`}
				onKeyDown={() => clearErrors()}
				{...register(name.toString(), {
					// value: (params[name as string] as string) || registerOptions?.value,
					value: registerOptions?.value,
					...registerOptions,
				})}
				errored={fieldError?.message ? 'true' : 'false'}
				disabled={isSubmitting || disabled}
				disableUnderline
				className="font_text_lg"
				defaultValue={defaultValue}
				{...rest}
			/>
			{fieldError ? (
				<ErrorMessageContainer>
					{fieldError.message?.toString()}
				</ErrorMessageContainer>
			) : null}
		</InputContainer>
	);
};

export default Input;
