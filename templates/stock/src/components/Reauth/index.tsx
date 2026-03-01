import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material';
import { Button } from '@ti_torra/web';
import React from 'react';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
export type ReauthDialogCloseButtonProps = {
	onClose?: () => void;
};

export function ReauthDialogCloseButton({
	onClose,
}: ReauthDialogCloseButtonProps) {
	return (
		<StyledReauthDialogCloseButton onClick={onClose}>
			<Close />
		</StyledReauthDialogCloseButton>
	);
}

const StyledReauthDialogCloseButton = styled(IconButton)`
	color: var(--color-neutral-01);
`;

const StyledDialogContent = styled(DialogContent)<{
	width: number | undefined;
}>`
	max-width: ${(props) => `${props.width ?? '1010'}px`};
	padding: 16px 24px;
`;

const ReauthDialogForm = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-flow: row nowrap;
	padding-top: 16px;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 1rem;
	width: 100%;
`;

// const ReauthDialogField = styled.div`
//   display: flex;
//   flex-flow: column nowrap;
//   flex: 1;
//   gap: 0.5rem;
//   align-items: flex-start;
//   justify-content: flex-start;
// `;

const ReauthDialogActions = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

export type ReauthDialogProps = React.PropsWithChildren<{
	open: boolean;
	closable?: boolean;
	title: string;
	submitButtonLabel?: string;
	cancelButtonLabel?: string;
	commitDisabled?: boolean;
	width?: number;
	onCancel?: () => void;
	onCommit?: () => void;
}>;

const StyledDialog = styled(Dialog)<{ width: number | undefined }>`
	& .MuiBackdrop-root {
		background: rgba(15, 23, 42, 0.65);
		backdrop-filter: blur(4px);
	}

	& .MuiPaper-root {
		max-width: ${(props) => `${props.width ?? 520}px`};
		width: 100%;
		border-radius: 20px;
		padding: 0;
		overflow: hidden;
		box-shadow:
			0 40px 80px rgba(0, 0, 0, 0.35),
			0 0 0 1px rgba(255, 255, 255, 0.05);
	}
`;

const FlexibleHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24px;

	background: linear-gradient(
		135deg,
		var(--color-primary-02),
		var(--color-primary-01)
	);

	box-shadow: 0 10px 30px rgba(99, 102, 241, 0.25);
`;

const TitleHeader = styled(DialogTitle)`
	padding: 0;
	margin: 0;
	color: #ffffff;
	font-weight: 600;
	font-size: 20px;
`;

export const MessageBody = styled.p`
	font-size: 15px;
	line-height: 24px;
	color: #475569;
	margin: 0;
`;

const PrimaryButton = styled(Button)`
	background: linear-gradient(135deg, #6366f1, #4f46e5);
	color: #fff !important;
	font-weight: 600;
	border-radius: 12px;
	padding: 10px 18px;

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35);
	}
`;

const SecondaryButton = styled(Button)`
	background: transparent;
	border: 1px solid #cbd5e1;
	color: #334155 !important;
	font-weight: 500;
	border-radius: 12px;
	padding: 10px 18px;

	&:hover {
		background: #f1f5f9;
	}
`;

const StyledDialogActions = styled(DialogActions)`
	padding: 24px;
`;

export function ReauthDialog({
	open,
	title,
	onCancel,
	onCommit,
	children,
	width,
	submitButtonLabel = 'Salvar',
	cancelButtonLabel = 'Cancelar',
}: ReauthDialogProps) {
	if (!open) return null;

	return (
		<StyledDialog width={width} fullWidth open onClose={onCancel}>
			<FlexibleHeader>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.75rem',
					}}
				>
					<WarningAmberRounded
						style={{ color: '#fff', opacity: 0.9 }}
					/>
					<TitleHeader>{title}</TitleHeader>
				</div>
			</FlexibleHeader>

			<StyledDialogContent width={width}>
				<ReauthDialogForm>{children}</ReauthDialogForm>
			</StyledDialogContent>

			<StyledDialogActions>
				<ReauthDialogActions>
					<SecondaryButton onClick={onCancel}>
						{cancelButtonLabel}
					</SecondaryButton>

					<PrimaryButton onClick={onCommit}>
						{submitButtonLabel}
					</PrimaryButton>
				</ReauthDialogActions>
			</StyledDialogActions>
		</StyledDialog>
	);
}
