'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import { Check } from '@mui/icons-material';
import { Row } from '@ti_torra/web';
import React from 'react';
import {
	BodyColumn,
	CellContainer,
	CheckBoxContainer,
	CheckedRadioInput,
	Container,
	HeadCheckboxContainer,
	HeaderColumn,
	HeaderRow,
	IndeterminateRadioInput,
	ListBody,
	ListContainer,
	ListHeader,
	ListRow,
	StyledCheckbox,
	TableBody,
	TableContainer,
	TableFilters,
	TableFooter,
	TableHeader,
	TableRow,
	TableWrapper,
	TitleContainer,
	TotalizerCell,
	TotalizerRow,
	UncheckedRadioInput,
	WrapContainer,
} from './styles';
import { TableProps } from './types.zod';

export function Table<T extends object>({
	content,
	columns,
	enableCheckbox,
	onRowChecked,
	onAllChecked,
	filters,
	noHasContent = false,
	maxSize = false,
	variant = 'grid',
	paddingRow,
	totalizer,
	totalizerColor = false,
	limitLines,
}: TableProps<T>) {
	const [selectedRows, setSelectedRows] = React.useState<Set<number>>(
		new Set(),
	);
	const checkboxAllRef = React.useRef<HTMLInputElement>(null);
	const allChecked =
		content.length > 0 && selectedRows.size === content.length;
	const partiallyChecked =
		selectedRows.size > 0 && selectedRows.size < content.length;

	React.useEffect(() => {
		if (!checkboxAllRef.current) return;
		checkboxAllRef.current.checked = allChecked;
		checkboxAllRef.current.indeterminate = partiallyChecked;
	}, [selectedRows, content]);

	if (!columns) return null;

	const limited = limitLines
		? content.slice(0, Math.max(0, limitLines))
		: content;

	return (
		<>
			{variant === 'grid' ? (
				<Container maxSize={maxSize}>
					<TableWrapper>
						{filters ? (
							<TableFilters>{filters}</TableFilters>
						) : null}
						<TableContainer>
							<TableHeader>
								<TableRow>
									{enableCheckbox && (
										<HeadCheckboxContainer
											size={columns.length}
										>
											<StyledCheckbox htmlFor="checkbox_all">
												<input
													type="checkbox"
													id="checkbox_all"
													ref={checkboxAllRef}
													onChange={(e) => {
														const isChecked =
															e.target.checked;

														setSelectedRows(
															(prevSelected) => {
																let newSelected =
																	new Set(
																		prevSelected,
																	);

																if (isChecked) {
																	content.forEach(
																		(
																			_,
																			idx,
																		) => {
																			if (
																				!newSelected.has(
																					idx,
																				)
																			) {
																				newSelected.add(
																					idx,
																				);
																			}
																		},
																	);
																} else {
																	newSelected =
																		new Set();
																}

																if (
																	onAllChecked
																) {
																	onAllChecked(
																		content,
																		e,
																	);
																}

																if (
																	onRowChecked
																) {
																	content.forEach(
																		(
																			row,
																			idx,
																		) => {
																			const wasAlreadySelected =
																				prevSelected.has(
																					idx,
																				);
																			if (
																				isChecked &&
																				!wasAlreadySelected
																			) {
																				onRowChecked(
																					row,
																					{
																						target: {
																							checked: true,
																						},
																					} as React.ChangeEvent<HTMLInputElement>,
																				);
																			} else if (
																				!isChecked &&
																				wasAlreadySelected
																			) {
																				onRowChecked(
																					row,
																					{
																						target: {
																							checked: false,
																						},
																					} as React.ChangeEvent<HTMLInputElement>,
																				);
																			}
																		},
																	);
																}

																return newSelected;
															},
														);
													}}
												/>
												{partiallyChecked && (
													<IndeterminateRadioInput />
												)}
												{allChecked &&
													!partiallyChecked && (
														<CheckedRadioInput className="checked">
															<Check fontSize="inherit" />
														</CheckedRadioInput>
													)}
												{!allChecked &&
													!partiallyChecked && (
														<UncheckedRadioInput className="unchecked" />
													)}
											</StyledCheckbox>
										</HeadCheckboxContainer>
									)}
									{columns
										.filter((column) => column.visible)
										.map((column) => (
											<TitleContainer
												alignText={column.align}
												key={`${column.name.toString()}_th`}
												size={columns.length}
											>
												{column.label}
											</TitleContainer>
										))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{noHasContent && !content.length && (
									<tr
										style={{
											backgroundColor:
												'transparent !important',
										}}
									>
										<td colSpan={columns.length}>
											<p
												style={{
													background:
														'transparent !important',
													color: 'var(--color-neutral-04)',
													width: '100%',
													textAlign: 'center',
													margin: '0',
													fontSize: '12px',
												}}
											>
												Ainda não há informações
												disponíveis para exibir.
											</p>
										</td>
									</tr>
								)}
								{limited.map((row, row_index) => {
									return (
										<TableRow
											key={`row_${row_index}`}
											selected={selectedRows.has(
												row_index,
											)}
										>
											{enableCheckbox && (
												<CheckBoxContainer
													size={columns.length}
												>
													<StyledCheckbox
														htmlFor={`row_${row_index}_checkbox`}
													>
														<input
															type="checkbox"
															name={`row_${row_index}_checkbox`}
															checked={selectedRows.has(
																row_index,
															)}
															id={`row_${row_index}_checkbox`}
															onChange={(e) => {
																const isChecked =
																	e.target
																		.checked;
																setSelectedRows(
																	(prev) => {
																		const newSet =
																			new Set(
																				prev,
																			);
																		if (
																			isChecked
																		) {
																			newSet.add(
																				row_index,
																			);
																		} else {
																			newSet.delete(
																				row_index,
																			);
																		}
																		return newSet;
																	},
																);
																if (
																	onRowChecked
																) {
																	onRowChecked(
																		row,
																		e,
																	);
																}
															}}
														/>

														<UncheckedRadioInput className="unchecked" />
														<CheckedRadioInput className="checked">
															<Check fontSize="inherit" />
														</CheckedRadioInput>
													</StyledCheckbox>
												</CheckBoxContainer>
											)}

											{columns
												.filter(
													(column) => column.visible,
												)
												.map((column) => {
													if (column.render) {
														return (
															<CellContainer
																key={`${row_index}_${column.name.toString()}_${columns.length}_${content.length}`}
																alignText={
																	column.align
																}
																size={
																	columns.length
																}
															>
																{column.render(
																	row,
																	row_index,
																)}
															</CellContainer>
														);
													}

													return (
														<CellContainer
															key={`${row_index}_${column.name.toString()}_${columns.length}_${content.length}`}
															alignText={
																column.align
															}
															size={
																columns.length
															}
														>
															{
																row[
																	column.name
																] as string
															}
														</CellContainer>
													);
												})}
										</TableRow>
									);
								})}
							</TableBody>
							{totalizer && (
								<TableFooter>
									{totalizerColor && <Row />}
									<TotalizerRow
										totalizerColor={totalizerColor}
									>
										{enableCheckbox && <TotalizerCell />}
										{columns
											.filter((col) => col.visible)
											.map((col) => (
												<TotalizerCell
													style={{
														// @ts-ignore
														textAlign:
															col.align ??
															'center',
													}}
													key={col.name.toString()}
												>
													{(
														totalizer as Record<
															string,
															React.ReactNode
														>
													)[col.name.toString()] ??
														''}
												</TotalizerCell>
											))}
									</TotalizerRow>
								</TableFooter>
							)}
						</TableContainer>
					</TableWrapper>
				</Container>
			) : (
				<WrapContainer maxSize={maxSize}>
					<ListContainer>
						<ListHeader>
							<HeaderRow>
								{enableCheckbox && (
									<HeadCheckboxContainer
										size={columns.length}
									>
										<StyledCheckbox htmlFor="checkbox_all">
											<input
												type="checkbox"
												id="checkbox_all"
												ref={checkboxAllRef}
												onChange={(e) => {
													const isChecked =
														e.target.checked;

													setSelectedRows(
														(prevSelected) => {
															let newSelected =
																new Set(
																	prevSelected,
																);

															if (isChecked) {
																content.forEach(
																	(
																		_,
																		idx,
																	) => {
																		if (
																			!newSelected.has(
																				idx,
																			)
																		) {
																			newSelected.add(
																				idx,
																			);
																		}
																	},
																);
															} else {
																newSelected =
																	new Set();
															}

															if (onAllChecked) {
																onAllChecked(
																	content,
																	e,
																);
															}

															if (onRowChecked) {
																content.forEach(
																	(
																		row,
																		idx,
																	) => {
																		const wasAlreadySelected =
																			prevSelected.has(
																				idx,
																			);
																		if (
																			isChecked &&
																			!wasAlreadySelected
																		) {
																			onRowChecked(
																				row,
																				{
																					target: {
																						checked: true,
																					},
																				} as React.ChangeEvent<HTMLInputElement>,
																			);
																		} else if (
																			!isChecked &&
																			wasAlreadySelected
																		) {
																			onRowChecked(
																				row,
																				{
																					target: {
																						checked: false,
																					},
																				} as React.ChangeEvent<HTMLInputElement>,
																			);
																		}
																	},
																);
															}

															return newSelected;
														},
													);
												}}
											/>
											{partiallyChecked && (
												<IndeterminateRadioInput />
											)}
											{allChecked &&
												!partiallyChecked && (
													<CheckedRadioInput className="checked">
														<Check fontSize="inherit" />
													</CheckedRadioInput>
												)}
											{!allChecked &&
												!partiallyChecked && (
													<UncheckedRadioInput className="unchecked" />
												)}
										</StyledCheckbox>
									</HeadCheckboxContainer>
								)}
								{columns
									.filter((c) => c.visible)
									.map((column) => (
										<HeaderColumn
											key={column.name as React.Key}
											style={{ width: column.width }}
										>
											{column.label}
										</HeaderColumn>
									))}
							</HeaderRow>
						</ListHeader>
						<ListBody>
							{content.map((row, row_index) => {
								return (
									<ListRow
										style={{
											padding: paddingRow,
										}}
										key={`row_${row_index}_${columns.length}_${content.length}`}
									>
										{enableCheckbox && (
											<CheckBoxContainer
												size={columns.length}
											>
												<StyledCheckbox
													htmlFor={`row_${row_index}_checkbox`}
												>
													<input
														type="checkbox"
														name={`row_${row_index}_checkbox`}
														id={`row_${row_index}_checkbox`}
														onChange={(e) => {
															if (onRowChecked) {
																onRowChecked(
																	row,
																	e,
																);
															}
														}}
													/>

													<UncheckedRadioInput className="unchecked" />
													<CheckedRadioInput className="checked">
														<Check fontSize="inherit" />
													</CheckedRadioInput>
												</StyledCheckbox>
											</CheckBoxContainer>
										)}

										{columns
											.filter((column) => column.visible)
											.map((column, col_index) => (
												<BodyColumn
													key={`${col_index}_${columns.length}_${content.length}`}
													style={{
														width: column.width,
													}}
												>
													{column.render ? (
														column.render(
															row,
															row_index,
														)
													) : (
														<p
															style={{
																margin: '0',
																padding: 0,
																fontSize:
																	'16px',
																display:
																	'inline-block',
																overflow:
																	'hidden',
																whiteSpace:
																	'nowrap',
																textOverflow:
																	'ellipsis',
																width: '420px',
																maxWidth:
																	'100%',
															}}
														>
															{
																row[
																	column.name
																] as React.ReactNode
															}
														</p>
													)}
												</BodyColumn>
											))}
									</ListRow>
								);
							})}
						</ListBody>
					</ListContainer>
				</WrapContainer>
			)}
		</>
	);
}
