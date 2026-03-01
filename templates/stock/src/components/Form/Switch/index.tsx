import React from 'react';
import styled from '@emotion/styled';
import {
	Switch as SwitchComponent,
	SwitchProps,
	Typography,
} from '@mui/material';

const StyledSwitch = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-items: center;

	/** Switch */
	.MuiSwitch-root {
		width: 40px !important;
		height: 20px !important;
		border-radius: 9px !important;
		padding: 0px 0px !important;
		display: 'flex' !important;
		margin: 0px 8px !important;
	}

	.MuiSwitch-root:active .MuiSwitch-thumb {
		width: 18px !important;
	}
	.MuiSwitch-root:active .MuiSwitch-switchBase.Mui-checked {
		transform: translateX(12px) !important;
	}

	.MuiSwitch-root .MuiSwitch-switchBase {
		padding: 2px !important;
	}
	.MuiSwitch-root .MuiSwitch-switchBase.Mui-checked {
		transform: translateX(20px) !important;
		color: var(--color-neutral-01) !important;
	}
	.MuiSwitch-root .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
		opacity: 1 !important;
		background-color: var(--color-primary-02) !important;
	}
	.MuiSwitch-root .MuiSwitch-thumb {
		box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2) !important;
		width: 12px !important;
		height: 12px !important;
		border-radius: 6px !important;
		transition: width 0.2s ease-in-out !important;
		transform: translate(2px, 2px) !important;
	}
	.MuiSwitch-root .MuiSwitch-track {
		border-radius: 16px !important;
		opacity: 1 !important;
		background-color: var(--color-neutral-02) !important;
		box-sizing: border-box !important;
	}
`;
export type StatusSwitchProps = { label?: string } & SwitchProps;

export function Switch({ checked, label, ...switchProps }: StatusSwitchProps) {
	return (
		<StyledSwitch>
			<SwitchComponent
				checked={checked}
				color="secondary"
				{...switchProps}
			/>
			<Typography>{label}</Typography>
		</StyledSwitch>
	);
}
