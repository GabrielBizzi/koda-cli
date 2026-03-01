'use client';
import styled from '@emotion/styled';
import { CardContent } from '@mui/material';

export const ContentCard = styled(CardContent)`
	position: relative;
	overflow: hidden;

	&::after {
		content: '';
		position: absolute;

		width: calc(100% - 48px);
		height: 5px;

		background-color: var(--text-primary);

		bottom: 20px;
		left: 50%;

		transform: translateX(-50%);
	}
`;

export const TitleModule = styled.h2`
	margin-top: 24px;
	margin-bottom: 8px;

	color: var(--text-primary);

	text-align: center;
	font-size: 1.5em;
	line-height: 125%;
	margin-bottom: 1rem;
	font-weight: 500;
`;

export const DescriptionModule = styled.p`
	line-height: 24px;
	min-height: 50px;
	height: auto;
	text-align: center;

	opacity: 0.9;
	color: var(--color-neutral-05) !important;

	font-size: 0.825rem;
	text-overflow: ellipsis;
	white-space: nowrap;

	overflow: hidden;
	width: 300px;
`;

export const Card = styled.div<{ loading?: boolean }>`
	position: relative;
	padding: 2rem;
	border-radius: 20px;
	background: #ffffff;
	border: 1px solid rgba(99, 102, 241, 0.08);

	transition: all 0.25s ease;
	cursor: pointer;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	${({ loading }) =>
		loading &&
		`
    transform: scale(0.98);
    box-shadow: 0 0 0 2px rgba(99,102,241,0.25);
  `}

	&:hover {
		transform: translateY(-6px);
		box-shadow:
			0 20px 40px rgba(15, 23, 42, 0.08),
			0 0 0 1px rgba(99, 102, 241, 0.25);
	}

	&:hover::before {
		opacity: 1;
	}

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 20px;
		background: linear-gradient(
			135deg,
			rgba(99, 102, 241, 0.15),
			transparent 60%
		);
		opacity: 0;
		transition: opacity 0.3s ease;
	}
`;

export const IconWrapper = styled.div`
	width: 52px;
	height: 52px;
	border-radius: 14px;
	display: flex;
	align-items: center;
	justify-content: center;

	background: linear-gradient(135deg, #6366f1, #4f46e5);
	box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35);

	svg {
		font-size: 24px;
		color: #ffffff;
	}
`;

export const ModuleTitle = styled.h3`
	margin: 0;
	font-size: 1.1rem;
	font-weight: 600;
	color: #0f172a;
`;

export const ModuleDescription = styled.p`
	margin: 0;
	font-size: 0.85rem;
	color: #64748b;
	line-height: 1.4;
`;

export const LoadingOverlay = styled.div`
	position: absolute;
	inset: 0;
	border-radius: 20px;
	backdrop-filter: blur(10px);
	background: rgba(15, 23, 42, 0.35);

	display: flex;
	align-items: center;
	justify-content: center;

	animation: fadeIn 0.25s ease;

	z-index: 5;

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;


export const GradientSpinner = styled.div`
	width: 52px;
	height: 52px;
	border-radius: 50%;
	position: relative;

	background: conic-gradient(from 0deg, #6366f1, #4f46e5, #818cf8, #6366f1);

	animation: spin 1s linear infinite;

	box-shadow: 0 0 30px rgba(99, 102, 241, 0.6);

	&::before {
		content: '';
		position: absolute;
		inset: 7px;
		border-radius: 50%;
		background: #ffffff;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
