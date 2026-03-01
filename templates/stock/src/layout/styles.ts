import styled from '@emotion/styled';

export const Container = styled.div`
	flex: 1 0 auto;
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	justify-content: stretch;
`;

export const ContainerGrid = styled.div<{ mobile?: boolean; opened?: boolean }>`
	flex: 1 0 auto;
	display: ${(props) => (props.mobile ? 'block' : 'grid')};
	${(props) =>
		!props.mobile &&
		`
		grid-template-areas: "sidebar main";
		grid-template-columns: ${props.opened ? '240px 1fr' : '70px 1fr'};
		transition: grid-template-columns 0.3s ease;
	`};
	height: 100vh;
	overflow: hidden;
	transition: grid-template-columns 0.3s ease;
	flex-flow: column nowrap;
	align-items: stretch;
	justify-content: stretch;
`;

export const WrapperRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 32px;
	border-bottom: 1px solid var(--border-subtle);
	background: var(--header-bg);
`;

export const StyledHeaderWrapper = styled.header`
	display: flex;
	flex-direction: column;
	background: var(--header-bg);
`;

export const UpperHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px 32px;

	background: var(--header-bg);
`;

export const Logo = styled.img`
	margin-right: auto;
	height: 50px;
	width: 108px;
	/* height: 3rem; */
	/* width={108} height={50} */
`;

export const Body = styled.div`
	background:
		radial-gradient(
			circle at 20% 20%,
			rgba(99, 102, 241, 0.05),
			transparent 40%
		),
		radial-gradient(
			circle at 80% 0%,
			rgba(59, 130, 246, 0.05),
			transparent 40%
		),
		#f8fafc;
	display: flex;
	flex-direction: column;
	grid-area: main;
	height: 100vh;
	overflow: hidden;
`;

export const StyledContentWrapper = styled.section`
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	min-height: 0;

	background:
		radial-gradient(
			circle at 20% 20%,
			rgba(99, 102, 241, 0.05),
			transparent 40%
		),
		radial-gradient(
			circle at 80% 0%,
			rgba(59, 130, 246, 0.05),
			transparent 40%
		),
		#f8fafc;
`;

export const StyledFooterWrapper = styled.section`
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	background: #fff;
	height: 60px;
	box-shadow: 0px -2px 7px #00000005;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		background: #fff;
		width: 240px;
		height: 60px;
		top: 0;
		left: -20px;
	}
`;

export const MainContentWrapper = styled.section`
	display: flex;
	/* width: 70rem; */
	flex: 0 0 1;
`;

export const Wrap = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: 30px;

	h1,
	h2 {
		color: var(--menu-color-bg);
	}

	h1 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		font-weight: 500;
	}

	h2 {
		font-size: 1.2rem;
		margin: 1rem 0;
		font-weight: 500;
	}

	p {
		color: var(--color-neutral-05);
	}

	ul {
		list-style: disc;
		padding-left: 2rem;

		color: var(--color-primary-02);
	}
`;

export const Content = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: 10px;

	h1,
	h2 {
		color: var(--menu-color-bg);
	}

	h1 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		font-weight: 500;
	}

	h2 {
		font-size: 1.2rem;
		margin: 1rem 0;
		font-weight: 500;
	}

	p {
		color: var(--color-neutral-05);
	}

	ul {
		list-style: disc;
		padding-left: 2rem;

		color: var(--color-primary-02);
	}
`;

export const Subtitle = styled.h2`
	color: var(--color-primary-02);
	font-size: 1.5rem;
	margin: 1.5rem 0;
`;

export const FooterText = styled.p`
	font-size: 0.825rem;
	z-index: 1;
	color: #a1a1aa; /* zinc-400 */
`;

export const FooterLinks = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.75rem; /* gap-3 */
	font-size: 0.825rem;
	color: #a1a1aa; /* zinc-400 */
`;

export const FooterLink = styled.a`
	text-decoration: none;
	color: inherit;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}
`;
