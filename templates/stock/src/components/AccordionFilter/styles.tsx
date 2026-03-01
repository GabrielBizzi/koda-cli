import styled from '@emotion/styled';
import { Accordion, AccordionDetails, Tab, Tabs } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';

export const AccordionFiltersCustomized = styled(Accordion)<{
	minHeight?: string;
}>`
	box-shadow: none;

	&.MuiPaper-root {
		background-color: transparent;

		&.MuiAccordion-root {
			background-color: transparent;
		}
	}

	.MuiAccordionSummary-root {
		${({ minHeight }) =>
			!!minHeight ? `min-height: 32px` : 'min-height: initial'};
	}

	&::before {
		border: none;
		background: none;
	}
`;

export const CustomTabs = styled(Tabs)(() => ({
	background: 'rgba(99,102,241,0.08)',
	backdropFilter: 'blur(8px)',
	padding: '4px',
	borderRadius: '8px',
	width: '100%',
	minHeight: '40px',

	'& .MuiTabs-indicator': {
		display: 'none',
	},
}));

export const CustomTab = styled(Tab)(() => ({
	textTransform: 'none',
	textOverflow: 'ellipsis',
	display: 'block',
	textWrap: 'nowrap',

	fontWeight: 500,
	borderRadius: '12px',
	minHeight: '40px',
	padding: '6px 16px',
	fontSize: '14px',

	maxWidth: '100%',
	minWidth: '100px',

	transition: 'all 0.25s ease',
	color: '#4b5563',

	marginRight: '4px',

	'&:last-of-type': {
		marginRight: 0,
	},

	'&.Mui-selected': {
		background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
		color: '#fff',
		fontWeight: 600,
	},

	'&:hover': {
		background: 'rgba(99,102,241,0.12)',
		color: '#1f2937',
	},
}));

export const AccordionCustomizedFiltersSummary = styled(AccordionSummary)<{
	minHeight?: string;
	centralizeIcon?: boolean | number;
}>`
	padding: 0;
	${({ minHeight }) =>
		!!minHeight ? `min-height: 32px` : 'min-height: 32px !important'};

	.MuiAccordionSummary-content {
		flex-direction: column;
		gap: 24px;
		margin: 0 !important;
	}

	.MuiAccordionSummary-expandIconWrapper {
		position: absolute;
		${({ centralizeIcon }) =>
			centralizeIcon && typeof centralizeIcon === 'boolean'
				? `
			top: 50%;
			transform: translateY(-50%);
		`
				: centralizeIcon && typeof centralizeIcon === 'number'
					? `
			top: ${centralizeIcon}px;
		`
					: `
			top: -5px;
		`}

		right: 5px;
	}
`;

export const AccordionCustomizedFiltersDetails = styled(AccordionDetails)`
	padding-left: 0px;
	padding-right: 0px;
`;
