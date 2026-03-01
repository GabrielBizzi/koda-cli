import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@mui/material';

export function ErrorDialogCloseButton({ onClose }: any) {
	return (
		<StyledErrorDialogCloseButton onClick={onClose}>
			<Close />
		</StyledErrorDialogCloseButton>
	);
}

export const StyledErrorDialogCloseButton = styled(IconButton)`
	color: var(--color-neutral-01);
`;

export const StyledDialogContent = styled(DialogContent)<{
	width: number | undefined;
}>`
	max-width: ${(props) => `${props.width ?? '848'}px`};
	padding: 1rem 1.5rem;

	width: 100%;
`;

export const BadgeCode = styled.div`
	color: var(--color-urgent-03);
	background: var(--color-urgent-01);

	border-radius: 50px;
	padding: 4px 8px;

	display: inline;

	width: 100%;

	font-size: 12px;
	font-weight: 400;
	line-height: 14px;
`;

export const RoteFlex = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-flow: row nowrap;
	padding-top: 16px;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;
	width: 100%;
`;

export const RoteDialog = styled.div`
	color: var(--color-urgent-03);
	font-size: 14px;
	font-weight: 400;
	line-height: 24px;
`;

export const ErrorDialogForm = styled.p`
	padding-top: 5px;
	width: 100%;

	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;

	color: var(--color-neutral-05);
	font-size: 18px;
	font-weight: bold;
	line-height: 24px;
`;

export const ErrorDialogActions = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

export const StyledDialog = styled(Dialog)<{
	width: number | undefined;
	level?: number;
}>`
	max-width: ${(props) => `${props.width ?? '848'}px`};
	width: 100%;
	margin: 0 auto;

	& .MuiPaper-root {
		max-width: ${(props) => `${props.width ?? '848'}px`};
		margin: 0;
		width: 100%;
		border-radius: 0;
		padding: 0;
		gap: 0;
		position: relative;
	}
`;

export const FlexibleHeader = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 1rem 1.5rem;

	background-color: var(--color-urgent-03);
`;

export const TitleHeader = styled(DialogTitle)`
	color: var(--color-neutral-01) !important;
	line-height: initial;
	font-size: 24px !important;
	font-weight: 400 !important;
	margin: 0 !important;
	padding: 0;
`;

export const MessageBody = styled.p`
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	margin: 0;

	color: var(--color-neutral-05);
`;

export const TitleContentHeader = styled.div<{
	selected?: boolean;
}>`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	gap: 10px;
	width: 100%;
	padding: 0.5rem 0px;
	position: relative;

	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.hour {
		color: var(--color-neutral-04);
		font-size: 12px;
		font-weight: 400;
	}
`;

export const StyledDialogActions = styled(DialogActions)`
	padding: 24px 1.5rem;
`;

export const ToolContentHeader = styled.section`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 25px;
`;

export const Urgency = styled.p<{ urgency?: number }>`
	font-size: 12px !important;
	text-align: left !important;
	width: 100% !important;
	display: flex;
	flex-direction: row;
	gap: 5px;
	margin: 0;

	span {
		color: ${(props) =>
			props.urgency === 1
				? 'var(--color-success-02)'
				: props.urgency === 2
					? 'var(--color-alert-02)'
					: 'var(--color-urgent-02)'};
		font-weight: 500;
	}
`;
