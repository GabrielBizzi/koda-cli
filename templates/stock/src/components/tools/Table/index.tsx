import React from 'react';
import { Grid, Pagination, PaginationItem, Skeleton } from '@mui/material';
import {
	ArrowForward,
	ArrowBack,
	FirstPage,
	LastPage,
} from '@mui/icons-material';
import { TableProps } from './types/table';
import { css, cx } from '@emotion/css';

export const Table = <T extends object>({
	rows,
	columns,
	tableClasses,
	columnsClasses,
	rowsClasses,
	emptyComponent,
	loading,
	gridOptions,
	pageSize,
	pages,
	page,
	onPageUpdate,
}: TableProps<T>) => {
	const [currentPage, setCurrentPage] = React.useState<number>(page || 1);

	const rowsPages = React.useMemo(() => {
		if (pages) return pages;
		const data = rows.length / pageSize;
		return data > 1 ? Math.ceil(data) : 1;
	}, [rows.length, pageSize, pages]);

	React.useEffect(() => setCurrentPage(page || 1), [page, rows]);

	if (loading) {
		return <Skeleton width={'100%'} height={'40vh'} />;
	}

	return (
		<div>
			{rows.length === 0 ? (
				<>{emptyComponent || null}</>
			) : (
				<>
					{/* TABLE CONTAINER */}
					<Grid
						container
						role="table"
						className={cx(
							css`
								width: 100%;
								height: 100%;
								padding-bottom: 10px;
							`,
							tableClasses,
						)}
						{...gridOptions}
					>
						{/* COLUMNS ROW */}
						<Grid item container className={cx(columnsClasses)}>
							{columns.map((column) => (
								<Grid
									item
									key={`th_${column.name.toString()}`}
									{...column.gridOptions}
									xs={column.gridOptions?.xs || 'auto'}
									sm={column.gridOptions?.sm || 'auto'}
									md={column.gridOptions?.md || 'auto'}
									lg={column.gridOptions?.lg || 'auto'}
									xl={column.gridOptions?.xl || 'auto'}
									className={cx(
										css`
											justify-self: flex-start;
											color: var(--color-neutral-04);
											font-size: 16px;
											font-weight: 400;
											line-height: 24px;
											width: 100%;
											padding: 0px 16px;
										`,
										column.columnClasses,
									)}
								>
									{column.label}
								</Grid>
							))}
						</Grid>

						{/* ROWS */}
						{(pages
							? rows
							: rows.slice(
									pageSize * (+currentPage - 1),
									pageSize * +currentPage,
								)
						).map((row, idx) => (
							<Grid
								item
								container
								key={`row_${idx}`}
								className={cx(
									css`
										padding: 16px;
										border-radius: 5px;
										border: 1px;
										opacity: 0px;
										background-color: var(
											--color-neutral-01
										);
										color: var(--color-neutral-05);
										border: 1px solid
											var(--color-neutral-02);
										height: 60px;
									`,
									rowsClasses,
								)}
							>
								{columns.map((column) => {
									if (column.render) {
										return (
											<Grid
												item
												key={`td_${column.name.toString()}_${idx}`}
												className={cx(
													css`
														display: flex;
														justify-content: flex-start;
														align-items: center;
														width: 100%;
													`,
													'font_text_lg',
													column.rowClasses,
												)}
												{...column.gridOptions}
												xs={
													column.gridOptions?.xs ||
													'auto'
												}
												sm={
													column.gridOptions?.sm ||
													'auto'
												}
												md={
													column.gridOptions?.md ||
													'auto'
												}
												lg={
													column.gridOptions?.lg ||
													'auto'
												}
												xl={
													column.gridOptions?.xl ||
													'auto'
												}
											>
												{column.render(row, rows)}
											</Grid>
										);
									}
									return (
										<Grid
											item
											key={`td_${column.name.toString()}_${idx}`}
											{...column.gridOptions}
											xs={
												column.gridOptions?.xs || 'auto'
											}
											sm={
												column.gridOptions?.sm || 'auto'
											}
											md={
												column.gridOptions?.md || 'auto'
											}
											lg={
												column.gridOptions?.lg || 'auto'
											}
											xl={
												column.gridOptions?.xl || 'auto'
											}
											className={cx(
												css`
													display: flex;
													justify-content: flex-start;
													align-items: center;
													width: 100%;
												`,
												'font_text_lg',
												column.rowClasses,
											)}
										>
											{/* @ts-ignore */}
											{row[column.name.toString()]}
										</Grid>
									);
								})}
							</Grid>
						))}
					</Grid>
					{rowsPages > 1 && (
						<Pagination
							count={rowsPages}
							showFirstButton={rowsPages > 5}
							showLastButton={rowsPages > 5}
							siblingCount={0}
							boundaryCount={1}
							page={+currentPage}
							onChange={(_e, val) => {
								setCurrentPage(val);
								onPageUpdate && onPageUpdate(val);
							}}
							renderItem={(item) => (
								<PaginationItem
									slots={{
										previous: ArrowBack,
										next: ArrowForward,
										first: FirstPage,
										last: LastPage,
									}}
									{...item}
								/>
							)}
							className={cx(css`
								/* background-color: var(--color-neutral-01); */
								/* border: 1px solid var(--color-neutral-02); */
								width: fit-content;
								padding: 8px 16px;
								border-radius: 5px;
								margin-top: 16px;
								margin: 16px auto;
								/* margin: 16px 0px 16px auto; */
								/* margin: 16px auto 16px 0px; */
							`)}
						/>
					)}
				</>
			)}
		</div>
	);
};
