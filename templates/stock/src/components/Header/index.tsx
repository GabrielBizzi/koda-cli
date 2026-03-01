import { Col, Grid, Row } from '@ti_torra/web';
import { Title } from './styles';
import { useBreakpoint } from '@/utils/breakpoints';
import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { OverlayContext } from '@/components/PageOverlay/context';
export type THeader = {
	title: string;
	filters?: React.ReactNode;
	sideButton?: React.ReactNode;
	backButton?: Url;
	style?: React.CSSProperties;
};
/**
 * @requires Esse componente não precisa estar envolta do Grid/Row/Col
 */
export const Header = ({
	title,
	filters,
	sideButton,
	backButton,
	style,
}: PropsWithChildren<THeader>) => {
	const router = useRouter();
	const { isOverlay, width, closeOverlay } = useContext(OverlayContext);

	const isCompact = isOverlay && width <= 768;
	const breakpoint = useBreakpoint();
	const titleStyle = {
		margin: backButton ? '0.5rem 0px' : '0.5rem 0px 0rem 0px',
	};

	return (
		<Grid style={style}>
			<Row>
				<Col
					sm={12}
					md={sideButton ? 6 : 12}
					lg={sideButton ? 9 : 12}
					xl={sideButton ? 10 : 12}
				>
					{backButton ? (
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								gap: '1rem',
							}}
						>
							<Link
								href={''}	
								onClick={(e) => {
									e.preventDefault();

									if (isCompact && closeOverlay) {
										closeOverlay();
									} else if (backButton) {
										router.push(backButton.toString());
									}
								}}
							>
								<Button
									variant="contained"
									style={{
										minWidth: '48px',
										minHeight: '48px',
										maxHeight: '48px',
										maxWidth: '48px',
									}}
								>
									<ChevronLeft
										style={{
											position: 'absolute',
											width: '65%',
											height: '100%',
										}}
										fontSize="large"
									/>
								</Button>
							</Link>
							<Title style={titleStyle}>{title}</Title>
						</div>
					) : (
						<Title style={titleStyle}>{title}</Title>
					)}
				</Col>
				{sideButton && (
					<Col sm={12} md={6} lg={3} xl={2}>
						<div
							style={{
								height: '50px',
								alignItems:
									breakpoint === 'sx' || breakpoint === 'sm'
										? undefined
										: 'end',
								width: '100%',
								display:
									breakpoint === 'sx' || breakpoint === 'sm'
										? undefined
										: 'flex',
								justifyContent:
									breakpoint === 'sx' || breakpoint === 'sm'
										? undefined
										: 'end',
							}}
						>
							{sideButton}
						</div>
					</Col>
				)}
			</Row>
			{filters && <>{filters}</>}
		</Grid>
	);
};
