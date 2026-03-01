import React from 'react';
import { Search, Close } from '@mui/icons-material';
import { Controller, useFormContext } from 'react-hook-form';
// import { useSearch } from '@tanstack/react-router';

import { iSearchInputProps } from './types/input.types';
import { getErrorMessage } from './utils/get-errors';
import {
	ErrorMessageContainer,
	InputContainer,
	InputLabel,
	StyledInput,
} from './styles';
import { css } from '@emotion/css';

const SearchInput: React.FC<iSearchInputProps> = ({
	label,
	name,
	registerOptions,
	disabled,
	formname,
	formref,
	...rest
}) => {
	const {
		formState: { errors },
		control,
		resetField,
		clearErrors,
	} = useFormContext();
	const inputRef = React.useRef<HTMLInputElement>();
	// const params: Record<string, string> = useSearch({ strict: false });
	const fieldError = React.useMemo(
		() => getErrorMessage(errors, name.toString()),
		[errors, name],
	);

	return (
		<Controller
			name={name.toString()}
			control={control}
			disabled={disabled}
			render={({ field, formState }) => (
				<InputContainer>
					{label && (
						<InputLabel
							className="font_title_xs"
							htmlFor={`${name.toString()}`}
						>
							{label}
						</InputLabel>
					)}
					<StyledInput
						id={`input_${name.toString()}`}
						onKeyDown={() => clearErrors()}
						errored={fieldError?.message ? 'true' : 'false'}
						disabled={formState.isSubmitting || disabled}
						ref={inputRef}
						disableUnderline
						className="font_text_lg"
						{...rest}
						onKeyUp={(e: any) => {
							if (rest.onKeyUp) rest.onKeyUp(e);
							field.onChange(e.currentTarget.value);
						}}
						type="text"
						endAdornment={
							!field.value ? (
								<Search
									className={css`
										background-color: var(
											--color-primary-01
										);
										border-radius: 4px;
										color: var(--color-neutral-01);
										/* height: 42px;*/
										/* width: 42px; */
										padding: 2px;
									`}
									onClick={() =>
										formref?.current?.requestSubmit()
									}
									fontSize="medium"
								/>
							) : (
								<Close
									className={css`
										background-color: var(
											--color-primary-01
										);
										border-radius: 4px;
										color: var(--color-neutral-01);
										/* height: 42px; */
										/* width: 42px; */
										padding: 2px;
									`}
									onClick={() => {
										resetField(field.name);
										// @ts-ignore
										inputRef.current.firstChild.value = '';
										// @ts-ignore
										if (rest.onReset) rest.onReset(null);
									}}
									fontSize="medium"
								/>
							)
						}
					/>
					{fieldError ? (
						<ErrorMessageContainer>
							{fieldError.message?.toString()}
						</ErrorMessageContainer>
					) : null}
				</InputContainer>
			)}
		/>
	);
};

export default SearchInput;
