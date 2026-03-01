import styled from '@emotion/styled';
import { ColsSize } from './types.zod';

export const Container = styled.div<{ maxSize: boolean }>`
	/* max-width: 1144px; */
	display: flex;
	/* flex: 1 0 auto; */
	align-items: stretch;
	/* background-color: red; */
	max-width: ${(props) =>
		props.maxSize ? 'calc(100vw + 8.375rem)' : '100%'};
	overflow-x: auto;
	width: ${(props) => (props.maxSize ? 'calc(100vw + 8.375rem)' : '100%')};
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow-y: hidden;
	height: 100%;
`;

export const TableFilters = styled.section`
	flex: 1;
	gap: 10px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin-bottom: 1rem;
`;

export const TableContainer = styled.table`
	border-collapse: collapse;
	display: table;
	flex: 1;
	table-layout: fixed;
	overflow: auto;
`;

// Grid

export const TableHeader = styled.thead`
	/* display: flex */
	display: table-header-group;
	align-items: center;
	margin-bottom: 16px !important;
	align-self: stretch;
`;

export const TableBody = styled.tbody`
	display: table-row-group;
	background-color: var(--color-neutral-01);

	tr:nth-child(odd) {
		background-color: #f3f3f3;
	}
`;

export const TableRow = styled.tr`
	display: table-row;
	height: 64px;
	padding: 16px 0px;
	flex: 1;
`;

export const TitleContainer = styled.th<ColsSize>`
	min-width: 100px;
	width: auto;
	height: 32px;
	color: var(--color_neutral_04, #aaa);
	text-align: ${(props) => props.alignText ?? 'center'};
	padding: 10px 20px 20px;
	margin-left: 16px;

	/* Body medium */
	font-family: 'Sofia Pro';
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px; /* 114.286% */
`;

export const HeadCheckboxContainer = styled.th<ColsSize>`
	width: 45px;
	min-width: 45px;
	max-width: 45px;
	color: var(--color_neutral_04, #aaa);
	text-align: center;
	padding: 10px 20px 20px;
	margin-left: 16px;

	/* Body medium */
	font-family: 'Sofia Pro';
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px; /* 114.286% */
`;

export const CellContainer = styled.td<ColsSize>`
	display: table-cell;
	min-width: 100px;
	width: auto;

	padding: 10px 20px;
	border-top: 1px solid #e8e8e8;
	border-bottom: 1px solid #e8e8e8;

	color: var(--color_neutral_05, #5f5f5f);
	text-align: ${(props) => props.alignText ?? 'center'};

	/* Body medium */
	font-family: 'Sofia Pro';
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px; /* 114.286% */
`;

export const CheckBoxContainer = styled.td<ColsSize>`
	display: flex;
	align-items: center;
	min-height: 79px;
	padding: 10px 20px;
	justify-content: center;
	position: relative;
	width: 45px;
	min-width: 45px;
	max-width: 45px;

	padding: 10px 0px 0px 20px;
	border-top: 1px solid #e8e8e8;
	border-bottom: 1px solid #e8e8e8;

	box-sizing: border-box;

	color: var(--color_neutral_05, #5f5f5f);
	text-align: center;

	/* Body medium */
	font-family: 'Sofia Pro';
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px; /* 114.286% */
`;

export const StyledCheckbox = styled.label`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 0.5rem;
	gap: 0.5rem;
	cursor: pointer;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	input[type='checkbox'] {
		-webkit-appearance: none;
		appearance: none;
		background-color: currentColor;
		margin: 0;
	}
	.checked {
		display: none;
	}

	/* Quando o checkbox for marcado, esconder a div 'unchecked' */
	input[type='checkbox']:checked ~ .unchecked {
		display: none;
	}

	/* Quando o checkbox for marcado, exibir a div 'checked' */
	input[type='checkbox']:checked ~ .checked {
		display: flex;
	}
`;

export const UncheckedRadioInput = styled.div`
	width: 1rem;
	height: 1rem;
	background-color: var(--main-color-bg);
	border-radius: 0.2rem;
	border: 1px solid var(--color-neutral-04);
`;

export const CheckedRadioInput = styled.div`
	display: none;
	width: 1rem;
	height: 1rem;
	background-color: var(--color-primary-01);
	color: white;
	border-radius: 0.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.8rem;
`;

// List

export const WrapContainer = styled.div<{ maxSize: boolean }>`
	/* max-width: 1144px; */
	display: flex;
	/* flex: 1 0 auto; */
	align-items: stretch;
	/* background-color: red; */
	max-width: ${(props) =>
		props.maxSize ? 'calc(100vw + 8.375rem)' : '100%'};
	width: ${(props) => (props.maxSize ? 'calc(100vw + 8.375rem)' : '100%')};
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	overflow-y: hidden;
	height: 100%;
`;

export const ListContainer = styled.div<{ mobile?: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 12px;
	overflow-x: auto;
	width: ${({ mobile }) => (mobile ? '100vw' : '100%')};
`;

export const ListHeader = styled.div`
	display: flex;
	gap: 10px;
	align-self: stretch;
`;

export const HeaderRow = styled.div`
	display: flex;
	flex: 1;
`;

export const HeaderColumn = styled.div<{
	align?: string;
	disableFlex?: boolean;
	disableSpacePaddingOnHeader?: boolean;
}>`
	${({ disableFlex }) =>
		!disableFlex &&
		`
    flex: 1;
  `}
	width: auto;
	min-width: 75px;
	text-wrap: wrap;
	text-align: ${({ align }) => align || 'center'};
	color: var(--color-neutral-04);
	font-size: 16px;
	padding: ${({ disableSpacePaddingOnHeader }) =>
		!!disableSpacePaddingOnHeader ? '0px' : '0px 16px'};
`;

export const ListBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const ListRow = styled.div<{ header?: boolean }>`
	display: flex;
	align-items: center;
	background: var(--color-neutral-01);
	border: 1px solid var(--color-neutral-02);
	gap: 10px;
	border-radius: 5px;
	padding: 12px;
`;

export const BodyColumn = styled.div<{ align?: string; disableFlex?: boolean }>`
	${({ disableFlex }) =>
		!disableFlex &&
		`
    flex: 1;
  `}
	min-width: 100px;
	text-align: ${({ align }) => align || 'center'};
	color: var(--color-neutral-05);
	font-size: 14px;
	padding: 0 8px;
`;
