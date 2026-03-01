'use client';
// import { PopupDialogCloseButtonProps } from '@/components/Popup';
import { usePopup } from '@/context/PopupProvider';
import { TMessageInfer } from '@/context/PopupProvider/types.zod';
// import { Content } from '@/layout/styles';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import { Col, Grid, Row } from '@ti_torra/web';
import dayjs from 'dayjs';

import { useCallback, useState } from 'react';
import {
	ContainerMessage,
	FlexibleHeader,
	MessageContent,
	MessageContentCard,
	MessagesContent,
	MessagesHeader,
	MessagesHeaderTitle,
	MessagesPopup,
	TitleContentHeader,
	TitleMessage,
	ToolContentHeader,
	TypoContent,
	Urgency,
} from './styles';

dayjs.locale('pt-br');

// export function PopupDialogCloseButton({
// 	onClose,
// }: PopupDialogCloseButtonProps) {
// 	return (
// 		<StyledPopupDialogCloseButton onClick={onClose}>
// 			<Close />
// 		</StyledPopupDialogCloseButton>
// 	);
// }

export default function Home() {
	const { setShow, setReadOnly, groupedMessages } = usePopup();

	const [message, setMessage] = useState<TMessageInfer | undefined>();

	const handleView = useCallback(
		(message: TMessageInfer) => {
			setMessage(message);
			setReadOnly(true);
			setShow(true);
		},
		[setMessage, setReadOnly, setShow],
	);

	// const onCancel = useCallback(() => {
	// 	setMessage(undefined);
	// }, []);

	return (
		<>
			<Grid>
				<Row>
					<Col sm={12} md={12} lg={3} xl={3}>
						<MessagesPopup>
							<>
								<MessagesHeader>
									<MessagesHeaderTitle>
										<h1>Últimas Notificações</h1>
									</MessagesHeaderTitle>
								</MessagesHeader>

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '15px',
									}}
								>
									{groupedMessages?.map(
										(vm: {
											date: string;
											messages: TMessageInfer[];
										}) => (
											<>
												<p
													style={{
														fontSize: '12px',
														color: 'var(--color-neutral-04)',
													}}
												>
													{vm.date}
												</p>

												{vm?.messages?.map((m) => (
													<MessagesContent
														key={
															m?.codigo_mensageria
														}
													>
														<MessageContentCard
															level={
																m?.urgencia as number
															}
															onClick={() =>
																handleView(m)
															}
															selected={
																message?.codigo_mensageria ===
																m?.codigo_mensageria
															}
															key={'_index'}
														>
															<span className="hour">
																{dayjs(
																	m?.criadoEm,
																).format(
																	'HH:mm',
																)}
															</span>
															<div>
																<span className="title">
																	{m?.titulo}
																</span>
																<p>
																	{
																		m?.descricao
																	}
																</p>
															</div>
														</MessageContentCard>
													</MessagesContent>
												))}
											</>
										),
									)}
								</div>
							</>
						</MessagesPopup>
					</Col>
					<Col sm={12} md={12} lg={9} xl={9}>
						{message ? (
							<ContainerMessage urgency={message.urgencia}>
								<FlexibleHeader>
									<TitleContentHeader
										level={message.urgencia as number}
									>
										<span className="hour">
											{dayjs(message.criadoEm).format(
												'HH:mm',
											)}
										</span>
										<TitleMessage>
											{message.titulo}
										</TitleMessage>
									</TitleContentHeader>
									<ToolContentHeader>
										<Urgency urgency={message.urgencia}>
											Urgência:{' '}
											<span>
												{message.urgencia === 1
													? 'Baixa'
													: message.urgencia === 2
														? 'Média'
														: 'Alta'}
											</span>
										</Urgency>
										{/* <PopupDialogCloseButton
											onClose={onCancel}
										/> */}
									</ToolContentHeader>
								</FlexibleHeader>

								<MessageContent>
									{message.descricao}
								</MessageContent>
							</ContainerMessage>
						) : (
							<TypoContent>
								<DraftsOutlinedIcon
									style={{
										fill: '#aaaaaa',
										width: 40,
									}}
									fontSize="inherit"
								/>
								<p
									style={{
										fontWeight: '400',
									}}
								>
									Selecione um item ao lado para ler
								</p>
								<span>Nada foi selecionado</span>
							</TypoContent>
						)}
					</Col>
				</Row>
			</Grid>
		</>
	);
}
