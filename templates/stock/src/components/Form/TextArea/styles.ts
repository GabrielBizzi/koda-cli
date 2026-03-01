import styled from '@emotion/styled';

export const TextAreaStyled = styled.textarea`
	font: inherit;
	letter-spacing: inherit;
	border-radius: 4px;
	color: currentColor;
	border: 0;
	box-sizing: content-box;
	background: none;
	height: 1.4375em;
	margin: 0;
	height: 100%;
	display: block;
	min-width: 0;
	animation-name: mui-auto-fill-cancel;
	animation-duration: 10ms;
	padding: 8.5px 14px;
	background: var(--color-neutral-01);
	outline: 2px solid transparent;
	border: 1px solid var(--color-neutral-02);
	&:focus {
		outline-color: var(--color-primary-01);
	}
`;
export const MuiTextAreaStyled = styled.div`
	font-family: var(--font-sofia-pro) !important;
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.4375em;
	color: rgba(0, 0, 0, 0.87);
	box-sizing: border-box;
	position: relative;
	cursor: text;
	display: inline-flex;
	align-items: center;
	background-color: var(--color-neutral-01);
	border-radius: 4px;
	flex: 1 0 auto;
	width: 100%;
	border: 1px solid var(--color-neutral-03);

	&:hover {
		border-color: #000;
	}

	&:focus {
		border-color: var(--color-primary-01);
	}
`;

export const Counter = styled.p`
	margin: 0;
	padding: 0;

	color: var(--color-neutral-04) !important;
	font-size: 14px;
`;
