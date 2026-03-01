import styled from '@emotion/styled';

export const WrapperSearch = styled.div`
	display: flex;
	flex-direction: row;
	gap: 12px;
	align-items: center;
`;

export const GearButton = styled.div`
	width: 40px;
	height: 40px;

	display: flex;
	align-items: center;
	justify-content: center;

	border-radius: 12px;
	background: #f1f5f9;
	border: 1px solid #e2e8f0;

	transition: all 0.2s ease;

	&:hover {
		background: #e2e8f0;
		border-color: #4f46e5;
	}

	.MuiIconButton-root {
		width: 100%;
		height: 100%;
		color: #334155;
	}
`;
