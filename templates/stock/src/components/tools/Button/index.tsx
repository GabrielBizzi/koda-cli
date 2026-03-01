import { css, cx } from '@emotion/css';
import {
	Button as BaseButton,
	ButtonProps,
	CircularProgress,
} from '@mui/material';

export const Button = ({
	...props
}: ButtonProps & { loading?: boolean; classStyles?: string }) => (
	<BaseButton
		{...props}
		className={cx(
			props.classStyles,
			css`
				min-height: 35px !important;
			`,
		)}
	>
		{!props.loading ? (
			<>{props.children}</>
		) : (
			<CircularProgress
				size={24}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					marginTop: '-12px',
					marginLeft: '-12px',
					color: 'var(--color-neutral-01)',
				}}
				className="text-color-neutral-01"
			/>
		)}
	</BaseButton>
);
