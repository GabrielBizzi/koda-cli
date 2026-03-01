'use client';
import { usePagination } from '@/context/pagination.context';
import styled from '@emotion/styled';
import { Check, Close } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Switch,
} from '@mui/material';
import { produce } from 'immer';
import React, { Dispatch, SetStateAction } from 'react';
import { useImmer } from 'use-immer';
import { ColumnProps } from '../Table/types.zod';

const TableDialogTitle = styled(DialogTitle)`
	padding: 0;
`;

const StyledTableDialogCloseButton = styled(IconButton)`
	position: absolute;
	top: 0.5rem;
	right: 0.5rem;
`;
export type TableDialogCloseButtonProps = {
	onClose(): void;
};
export function TableDialogCloseButton({
	onClose,
}: TableDialogCloseButtonProps) {
	return (
		<StyledTableDialogCloseButton onClick={onClose}>
			<Close />
		</StyledTableDialogCloseButton>
	);
}

const TableDialogForm = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 1rem;
	padding-top: 1rem;
	border-top: 1px solid var(--color-neutral-02);
`;

// const TableDialogField = styled.div`
//   display: flex;
//   flex-flow: column nowrap;
//   align-items: flex-start;
//   justify-content: flex-start;
// `;

const TableDialogActions = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;
const PaginationContainer = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-flow: column nowrap;
	align-items: start;
	justify-content: start;
`;
const ColumnsContainer = styled.div<{ hasPaginationContent?: boolean }>`
	max-height: 637px;
	flex: 1 0 auto;
	gap: 0.3rem;
	display: flex;
	flex-flow: column nowrap;
	align-items: start;
	justify-content: start;
	${({ hasPaginationContent }) =>
		hasPaginationContent &&
		`border-left: 1px solid var(--color-neutral-02);
		 padding-left: 1rem;
		`}
`;

const ColumnControl = styled.label`
	display: flex;
	flex: 1 0 auto;
	width: 100%;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
`;

export type TableDialogProps<T extends object> = React.PropsWithChildren<{
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	columns: ColumnProps<T>[];
	disablePagination?: boolean;
	disableControlledColumns?: boolean;
	onCancel(): void;
	onCommit(props: { columns: ColumnProps<T>[]; pagination: number }): void;
}>;

const RadioInput = styled.label`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 0.5rem;
	gap: 0.5rem;
	cursor: pointer;

	input[type='radio'] {
		-webkit-appearance: none;
		appearance: none;
		background-color: currentColor;
		margin: 0;
	}
`;

const UncheckedRadioInput = styled.div`
	width: 0.9rem;
	height: 0.9rem;
	background-color: var(--main-color-bg);
	border-radius: 0.2rem;
	border: 1px solid var(--color-neutral-04);
`;
const CheckedRadioInput = styled.div`
	width: 1rem;
	height: 1rem;
	background-color: var(--color-primary-01);
	color: white;

	/* padding: 0.5rem; */
	border-radius: 0.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.8rem;
`;

export function TableDialog<T extends object>({
	open,
	setOpen,
	columns,
	disablePagination = false,
	disableControlledColumns = false,
	onCancel,
	onCommit,
}: TableDialogProps<T>) {
	const { size } = usePagination();
	const [activePaginationOption, setActivePaginationOption] =
		React.useState(size);

	const [columnControls, updateColumnControls] = useImmer(columns ?? []);

	if (!open) return null;

	return (
		<Dialog
			open
			fullWidth
			maxWidth={
				disableControlledColumns || disablePagination ? 'sm' : 'md'
			}
			onClose={undefined}
			style={{
				padding: '1.2rem .5rem !important',
			}}
		>
			<TableDialogTitle>Preferências</TableDialogTitle>
			<TableDialogCloseButton onClose={onCancel} />
			<DialogContent
				style={{
					padding: '0px',
				}}
			>
				<TableDialogForm>
					{!disablePagination && (
						<PaginationContainer>
							<p
								style={{
									marginBottom: '1rem',
								}}
							>
								Tamanho da página
							</p>
							{[5, 10, 50, 100].map((sizePage, index) => {
								return (
									<RadioInput
										key={index}
										htmlFor={`${sizePage}-pagination-option`}
									>
										<input
											type="radio"
											id={`${sizePage}-pagination-option`}
											name="size"
											value={sizePage}
											defaultChecked={
												parseInt(
													size as unknown as string,
												) == sizePage
											}
											onChange={(e) =>
												setActivePaginationOption(
													parseInt(e.target.value),
												)
											}
										/>
										{sizePage == activePaginationOption ? (
											<CheckedRadioInput>
												<Check fontSize="inherit" />
											</CheckedRadioInput>
										) : (
											<UncheckedRadioInput />
										)}
										{sizePage} linhas
									</RadioInput>
								);
							})}
						</PaginationContainer>
					)}
					{!disableControlledColumns && (
						<ColumnsContainer
							hasPaginationContent={!disablePagination}
						>
							<p
								style={{
									marginBottom: '1rem',
								}}
							>
								Selecionar conteúdos visíveis
							</p>

							{columnControls.map(({ label, visible, name }) => (
								<ColumnControl
									key={label}
									htmlFor={`coluna-${name.toString()}`}
								>
									{label}
									<Switch
										checked={visible}
										color="secondary"
										name={`coluna-${name.toString()}`}
										id={`coluna-${name.toString()}`}
										onChange={() =>
											updateColumnControls(
												produce(
													columnControls,
													(draft) => {
														const column =
															draft.find(
																(col) =>
																	col.name ===
																	name,
															);
														if (!column) return;
														column.visible =
															!visible;
													},
												),
											)
										}
									/>
								</ColumnControl>
							))}
						</ColumnsContainer>
					)}
				</TableDialogForm>
			</DialogContent>
			<DialogActions>
				<TableDialogActions>
					<Button
						variant="outlined"
						sx={{
							borderRadius: '10px',
							textTransform: 'none',
							fontWeight: 500,
							borderColor: '#cbd5e1',
							color: '#475569',
							paddingY: '7px',
							paddingX: 3,
							'&:hover': {
								borderColor: '#94a3b8',
								background: '#f1f5f9',
							},
						}}
						onClick={onCancel}
					>
						Cancelar
					</Button>
					<Button
						variant="contained"
						color="primary"
						disabled={!columnControls.some((col) => col.visible)}
						onClick={() => {
							onCommit({
								columns: columnControls,
								pagination: activePaginationOption as number,
							});
							return setOpen(false);
						}}
					>
						Confirmar
					</Button>
				</TableDialogActions>
			</DialogActions>
		</Dialog>
	);
}
