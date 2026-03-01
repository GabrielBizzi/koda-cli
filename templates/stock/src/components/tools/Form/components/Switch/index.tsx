import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Switch as SwitchComponent } from '@mui/material';

import { iSwitchProps } from './types/switch.type';
import { getErrorMessage } from '../Input/utils/get-errors';
import { ErrorMessageContainer } from './styles';

export const Switch = ({
	name,
	label,
	defaultChecked,
	isDisabled,
	onChange,
}: iSwitchProps) => {
	const {
		formState: { errors },
		control,
	} = useFormContext();

	const fieldError = React.useMemo(
		() => getErrorMessage(errors, name.toString()),
		[errors, name],
	);

	return (
		<Controller
			name={name.toString()}
			control={control}
			defaultValue={defaultChecked}
			disabled={isDisabled}
			render={({ field }) => (
				<div>
					<div>
						<SwitchComponent
							name={field.name}
							disabled={field.disabled}
							defaultChecked={defaultChecked}
							checked={!!field.value}
							onChange={(e, checked) => {
								onChange && onChange(e, checked);
								field.onChange(e.target.checked);
							}}
							onClick={(e) => {
								field.onChange(e);
							}}
							inputProps={{ 'aria-label': 'controlled' }}
							color="primary"
						/>
						{label && (
							<label
								htmlFor={field.name}
								className="text-color-neutral-05 font-text-md"
							>
								{label}
							</label>
						)}
					</div>

					{fieldError ? (
						<ErrorMessageContainer>
							fieldError.message?.toString()
						</ErrorMessageContainer>
					) : null}
				</div>
			)}
		/>
	);
};
