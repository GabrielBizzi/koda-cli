import styled from '@emotion/styled';
import { Input } from '@mui/material';

export const InputContainer = styled.div`
	gap: 8px;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const InputLabel = styled.label`
	color: var(--color-neutral-05);
	font-size: 0.875em;
	line-height: 150%;
	font-weight: normal;
`;

export const StyledInput = styled(Input)<{ errored: string }>`
	padding: 8px 16px;
	border-radius: 4px;
	background-color: var(--color-neutral-01);
	height: 48px;
	border: 1px solid
		${(props) =>
			props.errored === 'true'
				? 'var(--color-urgent-02)'
				: 'var(--color-neutral-03)'};
	color: var(--color-neutral-05);

	& input {
		font-size: 1em;
	}

	& input::placeholder {
		color: var(--Color-neutral-04);
	}

	&:has(:focus) {
		border-color: var(--color-primary-01);
	}
	&:has(:disabled) {
		background-color: var(--color-neutral-02);
		border-color: var(--color-neutral-03);
	}
`;
export const ErrorMessageContainer = styled.span`
	color: var(--color-urgent-02);
`;
