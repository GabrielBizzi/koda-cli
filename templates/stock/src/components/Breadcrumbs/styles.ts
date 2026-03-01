import styled from '@emotion/styled';
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

export const Wrapper = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background: var(--header-bg);
`;

export const Contents = styled(MuiBreadcrumbs)`
	font-size: 14px;
	font-weight: 400;

	& ol {
		display: flex;
		align-items: center;
		gap: 8px;


		li {
			margin-top: 3px;
		}
	}

	& a {
		color: var(--text-secondary);
		font-weight: 400;
		transition: color 0.2s ease;

		&:hover {
			color: #6366f1; /* mesma cor do primary */
		}
	}

	& span {
		color: var(--text-primary);
		font-weight: 500;
	}

	& svg {
		color: var(--text-muted);
	}
`;
