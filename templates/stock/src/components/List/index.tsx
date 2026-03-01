import { Check } from '@mui/icons-material';
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
	ListBody,
	ListContainer,
	ListHeader,
	ListRow,
	StyledCheckbox,
	TableBody,
	TableContainer,
	TableFilters,
	TableHeader,
	TableRow,
	TitleContainer,
	UncheckedRadioInput,
	WrapContainer,
} from './styles';
import { TableProps } from './types.zod';
import { useBreakpoint } from '@/utils/breakpoints';

export function Table<T extends object>({
	content,
	columns,
	enableCheckbox,
	onRowChecked,
	filters,
	variant = 'grid',
	paddingRow,
	/**
	 * Define a tabela para oculpar 100% do tamanho disponível
	 * @property {boolean} maxSize
	 */
	maxSize = false,
}: TableProps<T>) {
	const breakpoint = useBreakpoint();
	const mobile = breakpoint === 'sm' || breakpoint === 'md';
	if (!columns) return null;

	return (
		<>
			{variant === 'grid' ? (
				<Container maxSize={maxSize}>
					{filters ? <TableFilters>{filters}</TableFilters> : null}
					<TableContainer>
						<TableHeader>
							<TableRow>
								{enableCheckbox && (
									<HeadCheckboxContainer
										size={columns.length}
									/>
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
							{content.map((row, row_index) => {
								return (
									<TableRow key={`row_${row_index}`}>
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
											.map((column, _index) => {
												if (column.render) {
													return (
														<CellContainer
															key={_index}
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
														key={_index}
														alignText={column.align}
														size={columns.length}
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
					</TableContainer>
				</Container>
			) : (
				<WrapContainer maxSize={maxSize}>
					<ListContainer mobile={mobile}>
						<ListHeader>
							<HeaderRow>
								{enableCheckbox && (
									<HeadCheckboxContainer
										size={columns.length}
									/>
								)}
								{columns
									.filter((c) => c.visible)
									.map((column) => (
										<HeaderColumn
											key={column.name as React.Key}
											align={column.align}
											disableFlex={!!column.width}
											disableSpacePaddingOnHeader={
												!!column.disableSpacePaddingOnHeader
											}
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
										header={false}
										key={`row_${row_index}`}
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
													key={col_index}
													align={column.align}
													disableFlex={!!column.width}
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
