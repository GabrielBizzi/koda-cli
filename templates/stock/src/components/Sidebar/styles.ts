import styled from '@emotion/styled';

export const MenuContainer = styled.nav<{ open: boolean; mobile: boolean }>`
	flex: 0 0 auto;
	display: flex;
	overflow-y: auto;
	background: linear-gradient(180deg, #1e293b, #0f172a);
	box-shadow: 4px 0 40px rgba(0, 0, 0, 0.25);
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;

	${(props) =>
		!props.mobile &&
		`
		grid-area: sidebar;
	`};
	${(props) =>
		props.mobile &&
		`
		position: fixed;
		top: 0;
		left: 0;
		height: 100dvh;
		width: 280px;
		z-index: 1400;
		transform: ${props.open ? 'translateX(0)' : 'translateX(-100%)'};
		transition: transform 0.3s ease;
	`}
	overflow-y: auto;

	flex-flow: column nowrap;
	align-items: ${(props) =>
		props.mobile && props.open
			? 'stretch'
			: props.mobile && !props.open
				? 'stretch'
				: !props.mobile && props.open
					? 'stretch'
					: 'center'};
	justify-content: space-between;
	gap: 1rem;

	padding: ${(props) =>
		props.mobile
			? '1.5rem 0.5rem'
			: props.open
				? '1.5rem 0.5rem'
				: '2.25rem 0.5rem 1rem 0.5rem'};
	overflow-x: hidden;
`;

export const MenuWrapper = styled.div<{ open: boolean }>`
	display: flex;
	flex-direction: column;
	padding: ${(props) => (props.open ? '8px' : '0px')};
	opacity: ${(props) => (props.open ? 1 : 1)};
	transition:
		opacity 0.3s ease ${(props) => (props.open ? '0.2s' : '0s')},
		transform 0.2s ease ${(props) => (props.open ? '0.2s' : '0s')};
	pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
`;

export const MenuItem = styled.div<{ open: boolean; isActive?: boolean }>`
	cursor: pointer;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;

	padding: 10px 12px;
	border-radius: 10px;
	transition: all 0.2s ease;

	background: ${({ isActive }) =>
		isActive ? 'rgba(99,102,241,0.15);' : 'transparent'};

	&:hover {
		background: rgba(99, 102, 241, 0.15);
	}

	color: ${({ isActive }) =>
		isActive ? '#FFFFFF' : 'rgba(255,255,255,0.75)'};

	svg {
		transition: all 0.2s ease;

		path {
			fill: ${({ isActive }) =>
				isActive ? '#FFFFFF' : 'rgba(255,255,255,0.75)'};
		}
	}
`;

export const MenuEntry = styled.div<{ open: boolean; mobile: boolean }>`
	display: flex;
	flex-flow: row nowrap;
	gap: 16px;
	align-items: center;
	justify-content: flex-start;
	width: ${(props) => (props.open ? '100%' : '72%')};
	overflow: hidden;
	position: relative;
	/* width: ${(props) => (props.open ? 12 : 6)}rem; */

	.icon-side {
		width: 20px;
		height: 20px;
		position: ${(props) =>
			(props.open && !props.mobile) || (props.open && props.mobile)
				? 'relative'
				: 'absolute'};
		left: ${(props) =>
			props.open && !props.mobile
				? '0px'
				: props.open && props.mobile
					? '0px'
					: '20px'};
	}

	.icon-arrow {
		position: absolute;
		display: block;
		opacity: ${(props) =>
			(props.open && !props.mobile) || (props.open && props.mobile)
				? 1
				: 0};
		transition: opacity 0.3s ease ${(props) => (props.open ? '0.2s' : '0s')};
		right: 0;
		top: 0;
	}

	span {
		display: block;
		opacity: ${(props) =>
			(props.open && !props.mobile) || (props.open && props.mobile)
				? 1
				: 0};
		transition: opacity 0.3s ease ${(props) => (props.open ? '0.2s' : '0s')};
		white-space: nowrap;
		font-size: 0.825rem;
		line-height: 150%;
	}
`;

export const Plan = styled.div`
	height: 120px;
	width: calc(100% - 32px);
	background: url(/plan.jpg);
	background-position: top;
	background-size: cover;
	background-blend-mode: luminosity;
	border-radius: 8px;
	margin: 0px auto;
	background-color: #262626;
	position: relative;
	overflow: hidden;
	border-radius: 8px;
`;
