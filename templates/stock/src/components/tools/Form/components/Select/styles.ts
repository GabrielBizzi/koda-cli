import styled from '@emotion/styled';

export const InputContainer = styled.div<{ error: string }>`
	gap: 8px;
	display: flex;
	flex-direction: column;
	width: 100%;

	fieldset {
		height: 20px !important;
	}

	.css-13cymwt-control {
		transition: all 0.25s ease !important;
	}

	.css-b62m3t-container {
		width: 100% !important;
	}

	.css-13cymwt-control:hover,
	.css-13cymwt-control:active,
	.css-t3ipsp-control:hover,
	.css-t3ipsp-control:active {
		border-color: ${(props) =>
			props.error === 'true'
				? 'var(--color-urgent-02)'
				: 'var(--color-neutral-03)'} !important;
	}
	.sel--is-disabled {
		width: 100% !important;
	}

	.sel__control {
		transition: none;
		border: 1px solid
			${(props) =>
				props.error === 'true'
					? 'var(--color-urgent-02)'
					: 'var(--color-neutral-03)'};
		color: var(--color-neutral-05);
		height: 48px;
		background: var(--color-neutral-01);
		cursor: pointer;

		.css-t3ipsp-control:hover,
		.css-t3ipsp-control:active {
			border: 1px solid
				${(props) =>
					props.error === 'true'
						? 'var(--color-urgent-02)'
						: 'var(--color-neutral-03)'} !important;
		}

		.sel__control--menu-is-open,
		.sel__control--is-focused {
			border-color: ${(props) =>
				props.error === 'true'
					? 'var(--color-urgent-02)'
					: 'var(--color-neutral-03)'} !important;
		}

		.sel__value-container--has-value {
			color: var(--color-neutral-05) !important;
		}

		.sel__value-container {
			.sel__placeholder {
				font-size: 13px;
				color: var(--color-neutral-03);
			}
			.sel__single-value {
				font-size: 1em;
				color: var(--color-neutral-05);
			}
		}

		.sel__input {
			font-size: 13px;
			color: var(--color-neutral-05) !important;
		}
	}

	.sel__indicator-separator {
		display: none;
	}

	.sel__menu {
		background-color: var(--color-neutral-01);
		transform: translate(0%, -7%);
		z-index: 10000;
		.sel__menu-list {
			padding: 0;
			.sel__option {
				background-color: var(--color-neutral-01);
				transition: 0.15s ease;
				cursor: pointer;
				&.sel__option--is-focused,
				&.sel__option--is-selected {
					background-color: var(--color-neutral-03);
					color: var(--color-neutral-05);
				}
			}

			&:last-child {
				border-radius: 0 0 4px 4px;
			}
		}
	}

	.sel--is-disabled {
		.sel__control--is-disabled {
			background: var(--color-neutral-02) !important;
			border-color: var(--color-neutral-03) !important;

			.sel__value-container {
				.sel__placeholder {
					color: #808080 !important;
				}
			}
			.sel__single-value {
				color: var(--color-neutral-03) !important;
			}
		}
	}
`;
export const InputLabel = styled.label`
	color: var(--color-neutral-05);
	/* font-size: 12px;
	line-height: 14px; */
	font-weight: 400;
`;

export const ErrorMessageContainer = styled.span`
	color: var(--color-urgent-02);
`;
