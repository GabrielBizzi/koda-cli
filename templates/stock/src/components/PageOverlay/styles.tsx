import styled from '@emotion/styled';

export const Backdrop = styled.div<{
	closing: boolean;
	mounted: boolean;
}>`
	position: fixed;
	inset: 0;
	background: rgba(15, 23, 42, 0.45);
	backdrop-filter: blur(4px);
	display: flex;
	justify-content: flex-end;
	z-index: 1300;

	transition: opacity 0.25s ease;

	opacity: ${({ mounted, closing }) => (!mounted ? 0 : closing ? 0 : 1)};
`;

export const Panel = styled.div<{
	width: number;
	closing: boolean;
	mounted: boolean;
}>`
	width: ${({ width }) => width}px;
	height: 100%;
	background: #ffffff;
	border-top-left-radius: 16px;
	border-bottom-left-radius: 16px;
	box-shadow: -30px 0 80px rgba(15, 23, 42, 0.12);
	padding: 32px 40px;
	padding-right: 24px;
	display: flex;
	flex-direction: column;
	overflow-y: auto;

	transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

	transform: ${({ mounted, closing }) =>
		!mounted
			? 'translateX(100%)'
			: closing
				? 'translateX(100%)'
				: 'translateX(0)'};
`;
