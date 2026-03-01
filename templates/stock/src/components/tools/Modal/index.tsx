import { css, cx } from '@emotion/css';
import { Modal as ModalComponent } from '@mui/material';
import React from 'react';
import { ModalComponentStyled } from './styles';

type ModalProps = {
	children: React.ReactNode;
	open: boolean;
	modalStyles?: string;
};

export const Modal = ({ children, modalStyles, open }: ModalProps) => {
	return (
		<ModalComponent open={open}>
			<ModalComponentStyled
				className={cx(
					'bg-color-neutral-01',
					css`
						width: calc(50%);
					`,
					modalStyles,
				)}
			>
				{children}
			</ModalComponentStyled>
		</ModalComponent>
	);
};
