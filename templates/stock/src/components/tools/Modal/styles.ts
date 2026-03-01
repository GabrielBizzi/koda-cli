import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ModalComponentStyled = styled(Box)`
    background: var(--color-neutral-01);
	height: auto;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`

export const ModalTitleDefault = styled.h2`
    line-height: 125%;
    font-size: 1.5em;

    font-weight: 600;
`

