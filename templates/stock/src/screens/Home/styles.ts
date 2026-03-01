import styled from '@emotion/styled';
import { Button, IconButton } from '@mui/material';

export const Logo = styled.section`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 2rem 0;
`;

export const Typo = styled.p`
	color: var(--color-neutral-03) !important;
	gap: 20px;
	font-size: 3rem !important;
	width: 100% !important;
	font-weight: 400 !important;
	display: flex !important;
	margin: 48px 0;
	flex-direction: column !important;
	justify-content: center !important;
	align-items: center !important;
`;
export const TypoContent = styled.span`
	color: var(--color-neutral-03) !important;
	font-size: 1.5rem !important;
	width: 100% !important;
	font-weight: 400 !important;
	display: flex !important;
	margin: 48px 0;
	flex-direction: column !important;
	justify-content: center !important;
	align-items: center !important;
	height: 100vh;
	max-height: calc(100vh - 470px);

	p {
		color: var(--color-neutral-05);
		font-size: 16px;
		margin: 0;
		margin-top: 15px;
		padding: 0;
		font-weight: 400;
	}

	span {
		color: var(--color-neutral-04);
		font-size: 14px;
		margin: 0;
		padding: 0;
		font-weight: 400;
	}
`;

export const TitleTypo = styled.h1`
	color: var(--color-primary-02) !important;
	font-size: 1.5rem !important;
	font-weight: bold !important;
	margin: 1.5rem 0 0 0 !important;
	margin-right: auto !important;
	text-align: left !important;
	width: 100% !important;
`;

export const TotalCounterNotifications = styled.p`
	color: var(--color-neutral-04) !important;
	font-size: 15px !important;
	text-align: left !important;
	width: 100% !important;
	margin: 0;
	margin-left: 10px;
	margin-bottom: 10px;
`;

// Notifications list

export const StyledPopupDialogCloseButton = styled(IconButton)`
	color: var(--text-primary);
`;

export const ContainerNotifications = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
	height: 100%;
	max-height: calc(100vh - 370px);
	max-width: 1200px;
	min-height: 150px;

	overflow-y: auto;
	gap: 15px;

	margin: 0 auto;
`;

export const FlexibleHeader = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding-bottom: 1rem;

	border-bottom: 1px solid var(--color-neutral-02);
`;

export const MessageContent = styled.p`
	color: var(--color-neutral-05) !important;
	line-height: 1.7rem;
	padding-top: 0.5rem;
	text-align: justify;
	font-size: 16px;
	font-weight: 400;
`;

export const Divider = styled.div`
	width: 60%;
	margin: 0 auto;

	height: 1px;

	border: 1px solid var(--color-neutral-02);
	margin-top: 0.75rem;
	margin-bottom: 0.75rem;
`;

export const ContainerMessage = styled.section<{ urgency?: number }>`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	height: 100vh;
	max-height: calc(100vh - 300px);

	border-radius: 12px;

	background: var(--color-neutral-01);
	border: 1px solid var(--color-neutral-02);

	min-height: 150px;
	overflow-y: auto;
	gap: 5px;
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
				? 'var(--color-suport-azul-01)'
				: props.urgency === 2
					? 'var(--color-primary-01)'
					: 'var(--color-urgent-02)'};
		font-weight: 500;
	}
`;

export const IdMessage = styled.p`
	color: var(--color-neutral-04) !important;
	opacity: 0.4;
	font-size: 15px !important;
	text-align: left !important;
	width: 100% !important;
	margin: 0;
`;

export const TitleMessage = styled.h1`
	color: var(--color-primary-02) !important;
	font-size: 14px !important;
	font-weight: 400 !important;
	margin: 0 !important;
	padding: 0;
`;

export const Notification = styled.section<{ viewed?: boolean }>`
	padding: 2.5rem 17.5px;

	width: 95%;
	max-height: 70px;
	min-height: 70px;
	overflow: hidden;
	height: 100%;

	background: var(--color-neutral-01);

	display: flex;
	flex-direction: row;

	align-items: center;
	justify-content: space-between;

	border-radius: 7px;
	border: 0.5px solid
		${(props) => (!props.viewed ? '#ff510140' : '#00000015')};
	position: relative;

	transition: all 0.3s;
	cursor: pointer;

	margin: 0 auto;

	span {
		background: #ff5101;
		width: 5px;
		height: 100%;

		position: absolute;

		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;

		transition: all 0.3s;

		left: ${(props) => (!props.viewed ? '0' : '-10px')};
		top: 0;
	}

	&:hover {
		border-color: #ff510150;

		span {
			left: 0 !important;
		}
	}

	& > div p {
		transition: all 0.3s;
		color: var(--color-neutral-04);
	}
`;

export const NotificationContent = styled.div`
	display: flex;
	flex-direction: column;

	gap: 5px;
	height: 100%;
	width: 100%;

	h2 {
		margin: 0;
	}

	p {
		margin: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;

// New Layout

export const MessagesPopup = styled.div`
	grid-area: popup;
	border-radius: 12px;
	position: relative;
	height: 100vh;
	overflow-y: auto;
	max-height: calc(100vh - 300px);
	background: var(--color-neutral-01);
	padding: 1rem;
	border: 1px solid var(--color-neutral-02);
`;

export const MessagesHeader = styled.div`
	width: 100%;
	display: flex;
	margin-bottom: 1.5rem;
	align-items: center;
	justify-content: space-between;

	border-bottom: 1px solid var(--color-neutral-02);
`;

export const MessagesHeaderTitle = styled.span`
	color: var(--text-primary);
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	align-items: flex-start;
	gap: 2px;
	padding-bottom: 3px;

	h1 {
		color: var(--text-primary);
		font-weight: 700;
		font-size: 16px;
	}

	p {
		font-weight: 400;
		font-size: 14px;
		margin: 0;
	}
`;

export const MessagesContent = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;
	overflow-y: auto;
	height: 100%;
	max-height: 500px;
	box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.07);
`;

export const MessageContentCard = styled(Button)<{
	level: number;
	selected?: boolean;
}>`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	border: 1px solid
		${(props) =>
			props.selected
				? 'var(--color-primary-01)'
				: 'var(--color-neutral-02)'};
	gap: 10px;
	width: 100%;
	padding: 0.5rem 1rem;
	position: relative;
	overflow-x: hidden;

	.hour {
		color: var(--color-neutral-04);
		font-size: 12px;
		font-weight: 400;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: start;
		flex: 1;
		width: 100%;

		.title {
			color: var(--color-primary-02);
			font-size: 14px;
			font-weight: 400;
			margin: 0;
			padding: 0;

			width: 300px;
			display: inline-block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			text-align: left;
		}
		p {
			flex: 1;
			margin: 0;
			padding: 0;
			color: var(--color-neutral-05);
			font-size: 12px;
			font-weight: 400;
			text-align: left;

			width: 300px;
			display: inline-block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	&::after {
		content: '';
		position: absolute;
		width: 5px;
		height: 100%;
		background: ${(props) =>
			props.level === 3
				? 'var(--color-urgent-02)'
				: props.level === 2
					? 'var(--color-primary-01)'
					: 'var(--color-suport-azul-01)'};
		left: 0;
		top: 0;
		transition: all 0.3s ease;
	}
`;

export const Loading = styled.div`
position: absolute;
top: 0;
left: 0;
display: flex;
flex - direction: row;
align - items: center;
justify - content: center;

background: rgba(255, 255, 255, 0.7);

transition: all 0.3s ease -in -out;

z - index: 1000;

width: 100 %;
height: 100 %;
`;

export const TitleContentHeader = styled.div<{
	level: number;
	selected?: boolean;
}>`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	width: 100%;
	padding: 1.5rem 1rem;
	position: relative;

	.hour {
		color: var(--color-neutral-04);
		font-size: 12px;
		font-weight: 400;
	}

	&::after {
		content: '';
		position: absolute;
		width: 5px;
		height: 100%;
		background: ${(props) =>
			props.level === 3
				? 'var(--color-urgent-02)'
				: props.level === 2
					? 'var(--color-primary-01)'
					: 'var(--color-suport-azul-01)'};
		left: 0;
		top: 0;
		transition: all 0.3s ease;
	}
`;

export const ToolContentHeader = styled.section`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 25px;
`;

export const ToolsRightControl = styled.div`
	gap: 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 1rem;
	justify-content: flex-end;

	button {
		padding: 0;
	}
`;
