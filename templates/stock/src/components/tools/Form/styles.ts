import styled from '@emotion/styled';

export const FormContainer = styled.form`
	width: 100%;
`;

export const InputsContainer = styled.div<{
	direction?: 'row' | 'column';
	inputBoxMaxWidth?: string | number;
}>`
	width: 100%;
	max-width: ${(props) =>
		props.inputBoxMaxWidth ? `${props.inputBoxMaxWidth}px` : '100%'};
	/* padding: 1rem; */
	display: flex;
	align-items: center;
	justify-content: center;

	flex-wrap: wrap;
	flex-direction: ${(props) => props.direction ?? 'column'};
	gap: 12px;

	& > * {
		flex: 1;
	}

	@media screen and (max-width: 768px) {
		padding: 8px;
	}
`;

export const ChildrenBox = styled.div<{ formDirection?: 'row' | 'column' }>`
	width: ${(props) =>
		props.formDirection === 'row' ? 'fit-content' : '100%'};
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;
