import styled from '@emotion/styled';

import WbCloudyRoundedIcon from '@mui/icons-material/WbCloudyRounded';

const Container = styled.div`
	width: 100%;
	height: 100%;
	flex: 1 0 auto;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

export function EmptyList() {
	return (
		<Container>
			<WbCloudyRoundedIcon
				style={{
					fontSize: '3rem',
				}}
			/>
			<p className="font-semibold text-md my-4 text-[#121212]">
				Não encontrado
			</p>
			<p className="font-medium text-[0.725rem] ">
				Não encontramos nenhum resultado. Tente ajustar sua busca ou
				usar palavras-chave diferentes.
			</p>
		</Container>
	);
}
