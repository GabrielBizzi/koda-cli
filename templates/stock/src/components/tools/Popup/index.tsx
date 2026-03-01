import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material';
import React from 'react';

export type PopupDialogCloseButtonProps = {
	onClose(): void;
};

export function PopupDialogCloseButton({
	onClose,
}: PopupDialogCloseButtonProps) {
	return (
		<StyledPopupDialogCloseButton onClick={onClose}>
			<Close />
		</StyledPopupDialogCloseButton>
	);
}

const StyledPopupDialogCloseButton = styled(IconButton)`
	color: var(--color-neutral-01);
`;

const StyledDialogContent = styled(DialogContent)<{ width: number }>`
	max-width: ${(props) => `${props.width ?? 1010}px`};
	padding: 16px 24px;

	width: 100%;
`;

const PopupDialogForm = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 1rem;
	width: 100%;
`;

const PopupDialogActions = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

export type PopupDialogProps = React.PropsWithChildren<{
	open: boolean;
	required?: boolean;
	closable?: boolean;
	title: string;
	submitButtonLabel?: string;
	cancelButtonLabel?: string;
	commitDisabled?: boolean;
	width?: number;
	onCancel?: () => void;
	onCommit?: () => void;
}>;

const StyledDialog = styled(Dialog)<{ width: number }>`
	max-width: ${(props) => `${props.width ?? 1010}px`};
	width: 100%;
	margin: 0 auto;
	padding: 0 !important;
	.MuiPaper-root {
		padding: 0 !important;
	}
	font-family:
		Sofia Pro,
		sans-serif !important;

	& .MuiPaper-root {
		max-width: ${(props) => `${props.width ?? 1010}px`};
		margin: 0;
		width: 100%;
		border-radius: 0;
	}
`;

const FlexibleHeader = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	padding: 24px 24px 16px 24px;
	align-items: center;
	justify-content: space-between;
	background-color: var(--color-primary-02);
	box-sizing: border-box;
`;

const TitleHeader = styled(DialogTitle)`
	padding: 0;
	margin: 0;
	flex: 1;

	color: var(--color-neutral-01);
	font-weight: bold;
	font-size: 22px;
`;

export const MessageBody = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	padding: 0 !important;

	color: var(--color-neutral-05);
`;

const StyledDialogActions = styled(DialogActions)`
	padding: 24px;
`;

export function PopupDialog({
	open,
	title,
	commitDisabled,
	onCancel,
	closable = true,
	onCommit,
	required = false,
	children,
	width,
	submitButtonLabel = 'Salvar',
	cancelButtonLabel = 'Cancelar',
}: PopupDialogProps) {
	if (!open) return null;

	return (
		<StyledDialog
			width={width as number}
			fullWidth
			open
			onClose={!required ? onCancel : undefined}
		>
			<FlexibleHeader>
				<TitleHeader>{title}</TitleHeader>
				{closable && !required ? (
					<PopupDialogCloseButton onClose={onCancel as any} />
				) : null}
			</FlexibleHeader>

			<StyledDialogContent width={width as number}>
				<PopupDialogForm>{children}</PopupDialogForm>
			</StyledDialogContent>

			<StyledDialogActions>
				<PopupDialogActions>
					{!required && onCancel ? (
						<Button
							style={{
								color: 'var(--color-neutral-01) !important',
								fontWeight: '500',
							}}
							variant="contained"
							color="secondary"
							onClick={onCancel}
						>
							{cancelButtonLabel}
						</Button>
					) : null}
					<Button
						variant="contained"
						color="primary"
						style={{
							color: 'var(--color-neutral-01) !important',
							fontWeight: '500',
						}}
						disabled={commitDisabled}
						onClick={onCommit}
					>
						{submitButtonLabel}
					</Button>
				</PopupDialogActions>
			</StyledDialogActions>
		</StyledDialog>
	);
}
