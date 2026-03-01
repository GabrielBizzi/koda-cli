import React, { Suspense } from 'react';
import {
	DefaultValues,
	FieldValues,
	FormProvider,
	useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid } from '@mui/material';

import { iFormProps } from './types/form.type';

import { getInput } from './utils/mapping';
import { ChildrenBox, FormContainer } from './styles';

const FormComponent = <T extends FieldValues>(
	{
		handleSubmit,
		children,
		zodSchema,
		inputs,
		formDirection,
		onResetForm,
		disableSetParams,
		formname,
		gridOptions,
	}: iFormProps<T>,
	ref: React.ForwardedRef<HTMLFormElement>,
): JSX.Element => {
	const methods = useForm<T>({
		resolver: zodSchema ? zodResolver(zodSchema) : undefined,
	});
	const _formname = formname || '';
	const innerRef = React.createRef<HTMLFormElement>();
	const _ref = ref || innerRef;
	const { handleSubmit: handleHookFormSubmit, reset, clearErrors } = methods;

	const handleReset: React.FormEventHandler<HTMLFormElement> =
		React.useCallback(
			(event) => {
				// setParams(undefined);

				inputs?.forEach((input) => {
					reset(input as unknown as DefaultValues<T>);
				});

				clearErrors();
				if (onResetForm) onResetForm(event);
			},
			[inputs, reset, onResetForm, clearErrors],
		);
	const handleFormSubmit = React.useCallback(
		async (data: T) => {
			await handleSubmit(data);

			if (disableSetParams) return;
			// console.log(window.location.search);
			// window.location.search = '?';
			// for (const [inputName, inputValue] of Object.entries(data)) {
			// 	window.location.search += '?login';
			// 	if (
			// 		StringUtils.isNullableValue(inputValue) ||
			// 		inputName === 'inputName'
			// 	)
			// 		return;
			// 	window.location.search += `&${inputName}=${inputValue}`;
			// }
		},
		[disableSetParams, handleSubmit],
	);

	return (
		<FormProvider {...methods}>
			<FormContainer
				name={_formname}
				onSubmit={handleHookFormSubmit(handleFormSubmit)}
				ref={_ref}
				onReset={handleReset}
			>
				<Suspense fallback="loading...">
					<Grid
						item
						spacing={0}
						sx={{
							flexDirection: {
								xs: formDirection || 'column',
								md: formDirection || 'row',
								lg: formDirection || 'row',
								xl: formDirection || 'row',
							},
							gap: 10
						}}
						justifyContent={{ xs: 'center', md: 'flex-start' }}
						style={{
							gap: '10px !important'
						}}
						alignItems={{ xs: 'center', md: 'center' }}
						gap={4}
						{...gridOptions}
					>
						{inputs &&
							inputs
								.map((input) => ({
									...input,
									name: input.name as string,
									formname: _formname,
									formref: _ref as
										| React.RefObject<HTMLFormElement>
										| undefined,
									grid: input.grid || {
										xs: 12,
										sm: 12,
										md: 12,
										lg: 12,
										xl: 12,
									},
								}))
								.map(getInput)}
					</Grid>
					{children && <ChildrenBox>{children}</ChildrenBox>}
				</Suspense>
			</FormContainer>
		</FormProvider>
	);
};

export const Form = React.forwardRef(FormComponent) as <T extends FieldValues>(
	props: iFormProps<T> & { ref?: React.ForwardedRef<HTMLFormElement> },
) => JSX.Element;
