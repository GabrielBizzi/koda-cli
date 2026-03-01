'use client';

import { Box, Button } from '@mui/material';
import { Col, Grid, NumberField, Row } from '@ti_torra/web';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from '../Form/DatePicker';
import { SearchButton } from '../Form/Search';
import { Select } from '../Form/Select';
import { TextField } from '../Form/TextField';
import { useAccordionFiltersHooks } from './_hooks/accordionFilters.hooks';
import { IAccordionFiltersProps } from './_types.hooks';
import {
	AccordionCustomizedFiltersDetails,
	AccordionFiltersCustomized,
	CustomTab,
	CustomTabs,
} from './styles';

export default function ControlledFiltersAccordion({
	id,
	closable = true,
	defaultOpened = false,
	onClose,
	onOpen,
	onChange,
	styles,
	inputs,
	form,
	onSubmit,
	tabStatus,
	hideInputs = true,
	SearchProps,
}: IAccordionFiltersProps) {
	const guid = useMemo(() => id ?? uuidv4(), [id]);
	const [valueTab, setValueTab] = useState(0);
	const {
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = form;

	const {
		expanded,
		on,
		a11yProps,
		filledFiltersCount,
		handleChange,
		toggleAccordion,
	} = useAccordionFiltersHooks({
		guid,
		closable,
		defaultOpened,
		onClose,
		onOpen,
		setValueTab,
		form,
		onChange,
	});

	return (
		<>
			{hideInputs ? (
				<AccordionFiltersCustomized
					style={{
						...styles,
						backgroundColor: 'transparent !important',
						margin: 0,
					}}
					expanded={expanded === guid || !closable}
					onChange={closable ? on(guid, onChange) : undefined}
				>
					<Grid>
						<Row>
							<Col sm={12} md={12} lg={12} xl={12}>
								<section
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									{tabStatus && (
										<div
											style={{
												maxWidth: '500px',
											}}
										>
											<CustomTabs
												value={valueTab}
												onChange={handleChange}
												variant="fullWidth"
												aria-label="styled tabs"
											>
												{tabStatus.map((tab, index) => (
													<CustomTab
														key={`${tab.label}_${index}`}
														label={tab.label}
														onClick={() =>
															setValue(
																'tabStatus',
																tab.value,
															)
														}
														disableRipple
														{...a11yProps(index)}
													/>
												))}
											</CustomTabs>
										</div>
									)}

									<Button
										variant="contained"
										onClick={toggleAccordion}
										sx={{
											background:
												'linear-gradient(135deg,#6366f1,#4f46e5)',
											borderRadius: '12px',
											textTransform: 'none',
											fontWeight: 500,
											boxShadow:
												'0 6px 18px rgba(99,102,241,0.35)',
											'&:hover': {
												background:
													'linear-gradient(135deg,#4f46e5,#4338ca)',
											},
										}}
									>
										<Box
											sx={{
												background: '#fff',
												color: '#6366f1',
												borderRadius: '50%',
												width: 22,
												height: 22,
												fontSize: 12,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												mr: 1,
												fontWeight: 600,
											}}
										>
											{filledFiltersCount}
										</Box>
										Filtros
									</Button>
								</section>
							</Col>
						</Row>
					</Grid>
					<AccordionCustomizedFiltersDetails>
						<Grid>
							<Row
								style={{
									alignItems: 'flex-end',
								}}
							>
								{inputs?.map(
									({
										name,
										label,
										type = 'text',
										options,
										placeholder,
										sm,
										xl,
										lg,
										md,
										isRequired,
										isLoading,
										isDisabled,
										styles,
										onClickEvent,
										labelCheckbox,
										onChangeEvent,
										// @ts-expect-error
										getLabel,
										// @ts-expect-error
										getValue,
										display = true,
										// @ts-expect-error
										estructures,
										// @ts-expect-error
										isUndefined,
										// @ts-expect-error
										isRequiredEstructure,
										// @ts-expect-error
										responsiveProps,
										...rest
									}) => {
										return (
											<Col
												xl={xl}
												lg={lg}
												md={md}
												sm={sm}
												key={name.toString()}
											>
												{type === 'select' && (
													<Select
														domId={`filter-${name}-label`}
														label={label}
														required={isRequired}
														hasError={
															!!errors?.[name]
														}
														textHelper={
															errors?.[name]
																?.message as string
														}
														value={watch(name)}
														options={options ?? []}
														fullWidth
														selectProps={{
															disabled:
																isDisabled,
														}}
														getLabel={(it) =>
															it?.[
																getLabel as keyof typeof it
															] as any
														}
														getValue={(it) =>
															it?.[
																getValue as keyof typeof it
															] as any
														}
														onChange={(val) => {
															setValue(
																name,
																val?.target
																	.value,
															);
														}}
														{...rest}
													/>
												)}

												{type === 'text' && (
													// @ts-expect-error
													<TextField
														label={label}
														value={watch(name)}
														placeholder={
															placeholder
														}
														required={isRequired}
														disabled={isDisabled}
														style={styles}
														hasError={
															!!errors?.[name]
														}
														textHelper={
															errors?.[name]
																?.message as string
														}
														fullWidth
														onChange={(val) =>
															setValue(
																name,
																val?.target
																	.value,
															)
														}
														{...rest}
													/>
												)}

												{type === 'date' && (
													// @ts-expect-error
													<DatePicker
														name={name}
														placeholder={
															placeholder
														}
														required={isRequired}
														disabled={isDisabled}
														label={label}
														style={styles}
														hasError={
															!!errors?.[name]
														}
														textHelper={
															errors?.[name]
																?.message as string
														}
														value={
															watch(name)
																? dayjs(
																		watch(
																			name,
																		),
																	)
																: undefined
														}
														onChange={(value) =>
															value
																? setValue(
																		name,
																		value,
																	)
																: setValue(
																		name,
																		undefined,
																	)
														}
														{...rest}
													/>
												)}

												{type === 'number' && (
													<NumberField
														label={label}
														placeholder={
															placeholder
														}
														value={
															watch(
																name,
															) as unknown as number
														}
														required={isRequired}
														disabled={isDisabled}
														hasError={
															!!errors?.[name]
														}
														textHelper={
															errors?.[name]
																?.message as string
														}
														onChange={(
															_e,
															value,
														) =>
															value
																? setValue(
																		name,
																		parseInt(
																			value as unknown as string,
																			10,
																		),
																	)
																: setValue(
																		name,
																		undefined,
																	)
														}
													/>
												)}
											</Col>
										);
									},
								)}
								{onSubmit && (
									<Col
										xl={SearchProps?.xl}
										lg={SearchProps?.lg}
										md={SearchProps?.md}
										sm={SearchProps?.sm}
									>
										<SearchButton
											{...SearchProps}
											onClickSearch={handleSubmit(
												onSubmit,
											)}
										/>
									</Col>
								)}
							</Row>
						</Grid>
					</AccordionCustomizedFiltersDetails>
				</AccordionFiltersCustomized>
			) : (
				<>
					{tabStatus && (
						<section
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<div
								style={{
									maxWidth: '500px',
								}}
							>
								<CustomTabs
									value={valueTab}
									onChange={handleChange}
									variant="fullWidth"
									aria-label="styled tabs"
								>
									{tabStatus.map((tab, index) => (
										<CustomTab
											key={`${tab.label}_${index}`}
											label={tab.label}
											onClick={() =>
												setValue('tabStatus', tab.value)
											}
											disableRipple
											{...a11yProps(index)}
										/>
									))}
								</CustomTabs>
							</div>
						</section>
					)}

					<Grid>
						<Row>
							{inputs?.map(
								({
									name,
									label,
									type = 'text',
									options,
									placeholder,
									sm,
									xl,
									lg,
									md,
									isRequired,
									isLoading,
									isDisabled,
									styles,
									onClickEvent,
									labelCheckbox,
									onChangeEvent,
									// @ts-expect-error
									getLabel,
									// @ts-expect-error
									getValue,
									display = true,
									// @ts-expect-error
									estructures,
									// @ts-expect-error
									isUndefined,
									// @ts-expect-error
									isRequiredEstructure,
									// @ts-expect-error
									responsiveProps,
									...rest
								}) => {
									return (
										<>
											<Col
												xl={xl}
												lg={lg}
												md={md}
												sm={sm}
												key={name.toString()}
											>
												{type === 'select' && (
													<Select
														domId={`filter-${name}-label`}
														label={label}
														required={isRequired}
														hasError={
															!!errors?.[name]
														}
														textHelper={
															errors?.[name]
																?.message as string
														}
														value={watch(name)}
														options={options ?? []}
														fullWidth
														selectProps={{
															disabled:
																isDisabled,
														}}
														getLabel={(it) =>
															it?.[
																getLabel as keyof typeof it
															] as any
														}
														getValue={(it) =>
															it?.[
																getValue as keyof typeof it
															] as any
														}
														onChange={(val) => {
															setValue(
																name,
																val?.target
																	.value,
															);
														}}
														{...rest}
													/>
												)}

												{type === 'text' && (
													// @ts-expect-error
													<TextField
														label={label}
														value={watch(name)}
														placeholder={
															placeholder
														}
														required={isRequired}
														disabled={isDisabled}
														style={styles}
														hasError={
															!!errors?.[name]
														}
														textHelper={
															errors?.[name]
																?.message as string
														}
														fullWidth
														onChange={(val) =>
															setValue(
																name,
																val?.target
																	.value,
															)
														}
														{...rest}
													/>
												)}

												{type === 'date' && (
													// @ts-expect-error
													<DatePicker
														name={name}
														placeholder={
															placeholder
														}
														required={isRequired}
														disabled={isDisabled}
														label={label}
														style={styles}
														hasError={
															!!errors?.[name]
														}
														textHelper={
															errors?.[name]
																?.message as string
														}
														value={
															watch(name)
																? dayjs(
																		watch(
																			name,
																		),
																	)
																: undefined
														}
														onChange={(value) =>
															value
																? setValue(
																		name,
																		value,
																	)
																: setValue(
																		name,
																		undefined,
																	)
														}
														{...rest}
													/>
												)}

												{type === 'number' && (
													<NumberField
														label={label}
														placeholder={
															placeholder
														}
														value={
															watch(
																name,
															) as unknown as number
														}
														required={isRequired}
														disabled={isDisabled}
														hasError={
															!!errors?.[name]
														}
														textHelper={
															errors?.[name]
																?.message as string
														}
														onChange={(
															_e,
															value,
														) =>
															value
																? setValue(
																		name,
																		parseInt(
																			value as unknown as string,
																			10,
																		),
																	)
																: setValue(
																		name,
																		undefined,
																	)
														}
													/>
												)}
											</Col>
										</>
									);
								},
							)}
							{onSubmit && (
								<Col
									xl={SearchProps?.xl}
									lg={SearchProps?.lg}
									md={SearchProps?.md}
									sm={SearchProps?.sm}
								>
									<SearchButton
										{...SearchProps}
										onClickSearch={handleSubmit(onSubmit)}
									/>
								</Col>
							)}
						</Row>
					</Grid>
				</>
			)}
		</>
	);
}
