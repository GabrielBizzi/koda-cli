'use client';
import { Content } from '@/layout/styles';
import { Col, Grid, Row } from '@ti_torra/web';
import { TitleTypo, Typo } from './styles';

export default function NotPermission() {
	return (
		<Content>
			<Grid>
				<Row
					style={{
						width: '100%',
						height: '100%',
					}}
				>
					<Col
						style={{
							width: '100%',
							height: '100vh',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							overflow: 'hidden',
						}}
						xl={12}
					>
						<TitleTypo>401</TitleTypo>
						<Typo>
							<span
								style={{
									fontSize: '1.5rem',
									fontWeight: '400',
								}}
							>
								Desculpe, você não tem permissão para acessar
								essa página.
							</span>
						</Typo>
					</Col>
				</Row>
			</Grid>
		</Content>
	);
}
