import styled from '@emotion/styled';
import { ColsSize } from './types.zod';

export const Container = styled.div<{ maxSize: boolean }>`
	max-width: ${(props) =>
		props.maxSize ? 'calc(100vw + 8.375rem)' : '100%'};

	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(12px);

	border-radius: 20px;

	border: 1px solid rgba(99, 102, 241, 0.08);
	box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
`;

export const TableWrapper = styled.div`
	padding: 1rem;
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
	border-collapse: separate;
	border: 1px solid rgba(99, 102, 241, 0.08);
	border-radius: 16px;
	border-spacing: 0;
	width: 100%;
`;

export const TableHeader = styled.thead`
	position: relative;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(99, 102, 241, 0.4),
			transparent
		);
	}

	tr {
		background: linear-gradient(
			135deg,
			rgba(99, 102, 241, 0.12),
			rgba(99, 102, 241, 0.04)
		);
		box-shadow:
			inset 0 -1px 0 rgba(99, 102, 241, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.4);

		box-shadow: inset 0 -1px 0 rgba(99, 102, 241, 0.15);
	}

	tr th {
		backdrop-filter: blur(8px);
		border-bottom: 1px solid rgba(99, 102, 241, 0.15);
	}

	tr:first-of-type {
		display: contents;

		th {
			box-shadow:
				inset 0 -1px 0 rgba(99, 102, 241, 0.15),
				inset 0 1px 0 rgba(255, 255, 255, 0.6);
		}
	}

	tr:first-of-type th:first-of-type {
		border-top-left-radius: 16px;
	}

	tr:first-of-type th:last-of-type {
		border-top-right-radius: 16px;
	}
`;

export const TableBody = styled.tbody`
	border-top: 1px solid #e2e8f0;
	background: white;
`;

export const TableRow = styled.tr<{ selected?: boolean }>`
	transition: background 0.15s ease;

	${({ selected }) =>
		selected &&
		`
      background: rgba(99,102,241,0.08);
      box-shadow: inset 3px 0 0 #6366f1;
    `}

	&:hover td {
		background: rgba(99, 102, 241, 0.05);
	}
`;

export const TitleContainer = styled.th<ColsSize>`
	padding: 18px 20px;
	text-align: ${(props) => props.alignText ?? 'left'};
	font-weight: 600;
	font-size: 13px;
	letter-spacing: 0.5px;
	text-transform: uppercase;
	color: #64748b;
`;

export const HeadCheckboxContainer = styled.th<ColsSize>`
	width: 45px;
	min-width: 45px;
	max-width: 45px;
	color: var(--color_neutral_04, #aaa);
	text-align: center;
	padding: 10px 20px 20px;
	margin-left: 16px;
	position: relative;

	/* Body medium */
	font-family: var(--font-montserrat);
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px; /* 114.286% */
`;

export const CellContainer = styled.td<ColsSize>`
	padding: 18px 20px;
	border-bottom: 1px solid #f1f5f9;
	border-top: none;
	font-size: 14px;
	color: #334155;
	text-align: ${(props) => props.alignText ?? 'left'};
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

	box-sizing: border-box;

	color: var(--color_neutral_05, #5f5f5f);
	text-align: center;

	/* Body medium */
	font-family: var(--font-montserrat);
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
	width: 18px;
	height: 18px;
	border-radius: 6px;
	border: 1px solid #cbd5e1;
	background: white;
	transition: all 0.2s ease;
`;

export const IndeterminateRadioInput = styled.div`
	width: 1rem;
	height: 1rem;
	border-radius: 0.2rem;

	background-color: var(--color-primary-01);
	position: relative;

	&::after {
		content: '-';
		position: absolute;
		top: -3px;
		width: 1rem;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
		line-height: 1;
		color: white;
	}
`;

export const CheckedRadioInput = styled.div`
	width: 18px;
	height: 18px;
	border-radius: 6px;
	background: linear-gradient(135deg, #6366f1, #4f46e5);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 12px;
`;

export const TableFooter = styled.tfoot`
	display: table-footer-group;
	background-color: var(--color-neutral-01);
`;

export const TotalizerRow = styled.tr<{ totalizerColor: boolean }>`
	background: linear-gradient(135deg, #6366f1, #4f46e5);
	color: white;
	font-weight: 600;
`;

export const TotalizerCell = styled.td`
	padding: 16px 20px;
	font-size: 14px;
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
	height: 100%;
`;

export const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 14px;
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

export const HeaderColumn = styled.div`
	font-size: 13px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.4px;
	color: #94a3b8;
`;

export const ListBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const ListRow = styled.div`
	display: flex;
	align-items: center;
	background: white;
	border-radius: 16px;
	padding: 16px 20px;
	border: 1px solid #f1f5f9;
	box-shadow: 0 5px 15px rgba(15, 23, 42, 0.04);

	transition: all 0.2s ease;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 15px 35px rgba(99, 102, 241, 0.12);
		border-color: rgba(99, 102, 241, 0.3);
	}
`;

export const BodyColumn = styled.div`
	flex: 1;
	font-size: 14px;
	color: #334155;
`;
