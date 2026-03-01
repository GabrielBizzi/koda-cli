import React from 'react';
import RSSelect, { SingleValue, MultiValue } from 'react-select';
import { Controller, useFormContext } from 'react-hook-form';

import { iSelectProps, Option } from './types/select.type';
import { ErrorMessageContainer, InputContainer, InputLabel } from './styles';
import { SelectIcon } from './components/ChevronIcon';
import { css } from '@emotion/css';

export const Select: React.FC<iSelectProps> = ({
	name,
	options,
	isApiSearch,
	handleInputChange,
	label,
	isLoading,
	placeholder,
	defaultValue,
	isDisabled,
	maxMenuHeight,
	onSelectOption,
	noOptionsMessage,
	required,
	isMulti,
	...rest
}) => {
	const { control, clearErrors, setValue } = useFormContext();
	const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

	const handleBlur = React.useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	React.useEffect(() => {
		if (defaultValue) {
			setValue(name as string, defaultValue.value);

			return;
		}
	}, [setValue, defaultValue, isLoading, name]);
	return (
		<Controller
			control={control}
			name={name as string}
			rules={{
				required,
			}}
			render={({ field, fieldState }) => (
				<InputContainer error={fieldState.error ? 'true' : 'false'}>
					{label && (
						<InputLabel
							className="font_title_xs"
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
					<RSSelect
						id={`select_${name.toString()}`}
						{...field}
						options={options}
						isLoading={isLoading}
						placeholder={placeholder ?? 'Selecione'}
						components={{
							DropdownIndicator: () => (
								<SelectIcon error={!!fieldState.error} open={isMenuOpen} />
							),
						}}
						isDisabled={isLoading || isDisabled}
						blurInputOnSelect
						classNamePrefix="sel"
						defaultMenuIsOpen={false}
						maxMenuHeight={maxMenuHeight ?? 170}
						onBlur={handleBlur}
						isMulti={isMulti}
						value={
							!field.value
								? null
								: isMulti
									? (options.filter((option) =>
											(field.value as Array<string>).includes(
												`${option.value}`,
											),
										) ?? null)
									: (options.find((option) => option.value == field.value) ??
										null)
						}
						onChange={(selectedOption) => {
							field.onChange(
								isMulti
									? (selectedOption as MultiValue<Option>).map(
											(opt) => opt.value,
										)
									: (selectedOption as SingleValue<Option>)?.value,
							);

							if (onSelectOption)
								onSelectOption(
									(selectedOption as Option | MultiValue<Option>) ?? null,
								);

							handleBlur();
						}}
						onInputChange={(query, { action }) => {
							if (isApiSearch) {
								setIsMenuOpen(action === 'input-change' && query !== '');
							}
							if (handleInputChange) {
								handleInputChange(query, action);
							}
						}}
						onFocus={() => {
							clearErrors();
							if (!isApiSearch) setIsMenuOpen(true);
						}}
						menuIsOpen={isMenuOpen}
						noOptionsMessage={() => <p>{noOptionsMessage || ''}</p>}
						styles={{
							control: (baseStyle) => ({
								...baseStyle,
								borderRadius: isMenuOpen ? '4px 4px 0px 0px' : '4px',
								borderWidth: '1px',
							}),
						}}
						theme={(theme) => ({
							...theme,
							colors: {
								...theme.colors,
								primary: fieldState.error
									? 'var(--color-urgent-02)'
									: 'var(--color-neutral-03)',
							},
						})}
						isClearable
						{...rest}
					/>
					{fieldState.error ? (
						<ErrorMessageContainer>
							{fieldState.error.message?.toString()}
						</ErrorMessageContainer>
					) : null}
				</InputContainer>
			)}
		/>
	);
};
