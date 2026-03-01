'use client';
import { ResultadoListObjSchema } from '@/common/_index';
// import { MessageBody, PopupDialog } from '@/components/Popup';
import { api } from '@/services/api';
import { useSystem } from '@/stores';
import { buildQueryParams } from '@/utils/buildQueryParams';
import dayjs from 'dayjs';
import { usePathname } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, {
	createContext,
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useCallback,
	useContext,
	useEffect,
	useRef,
} from 'react';
import { z } from 'zod';
import { TMessageInfer, tMessageSchema } from './types.zod';
import { useGuard } from '../guard.context';

interface PopupDefaultProvider {
	setCurrentMessage: Dispatch<SetStateAction<TMessageInfer | null>>;
	currentMessage: TMessageInfer | null;
	setMessages: Dispatch<SetStateAction<TMessageInfer[]>>;
	messages: TMessageInfer[];
	setViewedMessages: Dispatch<SetStateAction<TMessageInfer[]>>;
	viewedMessages: TMessageInfer[];
	readOnly: boolean;
	setReadOnly: Dispatch<SetStateAction<boolean>>;
	confirmPopup: VoidFunction;
	setShow: Dispatch<SetStateAction<boolean>>;
	show: boolean;
	hasFetched: MutableRefObject<boolean>;
	groupedMessages: any;
	fetchMessages: VoidFunction;
}

const PopupContext = createContext<PopupDefaultProvider | undefined>(undefined);

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
	const [messages, setMessages] = React.useState<TMessageInfer[]>([]);
	const pathname = usePathname();
	const [viewedMessages, setViewedMessages] = React.useState<TMessageInfer[]>(
		[],
	);
	const [groupedMessages, setGroupedMessages] = React.useState<any>();
	const [readOnly, setReadOnly] = React.useState<boolean>(false);
	const [currentMessage, setCurrentMessage] =
		React.useState<TMessageInfer | null>(null);
	const [show, setShow] = React.useState<boolean>(false);
	const { enqueueSnackbar } = useSnackbar();
	const { user } = useGuard();
	const hasFetched = useRef(false);
	const { system } = useSystem();

	const fetchMessages = useCallback(async () => {
		const isHome = pathname === '/adm';

		if (hasFetched.current) return;
		hasFetched.current = true;

		try {
			const FetchType = ResultadoListObjSchema(tMessageSchema);
			type FetchTypeData = z.infer<typeof FetchType>;

			const queryParams = buildQueryParams({
				codigo_sistema: system?.codigoSistema,
				codigo_perfil: user?.empresaSelecionada?.perfis.map(
					(p) => p.codigoPerfil,
				),
				codigo_filial: user?.filiais?.map((f: any) => f.codigoFilial),
			});

			const { data } = await api.get<FetchTypeData>(
				`/Admin/v1/PopUp?${queryParams}`,
			);

			const unviewedPopups: TMessageInfer[] = data.lista?.reduce(
				(acc: any[], popup) => {
					if (!popup.visualizado) {
						acc.push({
							codigo_mensageria: popup.codigo_mensageria,
							tipo: popup.tipo,
							confirmacao: popup.confirmacao,
							descricao: popup.descricao,
							expira_em: popup.expira_em,
							titulo: popup.titulo,
							urgencia: popup.urgencia,
							visualizado: popup.visualizado,
							criadoEm: popup.criadoEm,
						});
					} else {
						setViewedMessages((prev) => [
							...prev,
							{
								codigo_mensageria: popup.codigo_mensageria,
								tipo: popup.tipo,
								confirmacao: popup.confirmacao,
								descricao: popup.descricao,
								expira_em: popup.expira_em,
								titulo: popup.titulo,
								urgencia: popup.urgencia,
								visualizado: popup.visualizado,
								criadoEm: popup.criadoEm,
							},
						]);
					}

					return acc;
				},
				[],
			) as TMessageInfer[];

			unviewedPopups.sort(
				(a, b) =>
					dayjs(b.criadoEm).valueOf() - dayjs(a.criadoEm).valueOf(),
			);

			if (!isHome) {
				setViewedMessages((prev) => {
					const existingCodes = new Set(
						prev.map((msg) => msg.codigo_mensageria),
					);

					const novosUnviewed = unviewedPopups.filter(
						(msg) =>
							!!msg.codigo_mensageria &&
							!existingCodes.has(msg.codigo_mensageria),
					);

					return [...prev, ...novosUnviewed];
				});
			}

			const grouped = data.lista?.reduce(
				(acc, message) => {
					const dateKey = dayjs(message.criadoEm).format(
						'DD/MM/YYYY',
					);

					if (!acc[dateKey]) {
						acc[dateKey] = [];
					}
					acc[dateKey].push(message);

					return acc;
				},
				{} as Record<string, TMessageInfer[]>,
			);

			const groupedArray = Object.entries(
				grouped as Record<string, TMessageInfer[]>,
			)
				.sort(
					([dateA], [dateB]) =>
						dayjs(dateB, 'DD/MM/YYYY').valueOf() -
						dayjs(dateA, 'DD/MM/YYYY').valueOf(),
				)
				.map(([date, messages]) => ({
					date,
					messages,
				}));

			setGroupedMessages(groupedArray);
			setMessages(unviewedPopups);
			setCurrentMessage(unviewedPopups[0] || null);
			setShow(unviewedPopups.length > 0);
		} catch (err) {
			console.error(err);
		}
	}, [
		user?.empresaSelecionada?.perfis,
		user?.filiais,
		pathname,
		system?.codigoSistema,
	]);

	useEffect(() => {
		const isHome = pathname === '/adm';

		setCurrentMessage(isHome ? messages[0] || null : null);
		setShow(isHome && messages.length > 0);
	}, [messages, pathname]);

	const confirmPopup = useCallback(async () => {
		try {
			await api.patch('/Admin/v1/PopUp', {
				codigo_mensageria: currentMessage?.codigo_mensageria,
				codigo_sistema: system?.codigoSistema,
			});

			if (currentMessage) {
				setViewedMessages((prev) => [...prev, currentMessage]);
			}

			setMessages((prev) => {
				const updatedMessages = prev.slice(1);
				setCurrentMessage(updatedMessages[0] || null);
				setShow(updatedMessages.length > 0);
				return updatedMessages;
			});
		} catch (err) {
			console.error(err);
			enqueueSnackbar('Não foi possível realizar a ação.', {
				variant: 'error',
			});
		}
	}, [currentMessage, enqueueSnackbar, system?.codigoSistema]);

	useEffect(() => {
		fetchMessages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PopupContext.Provider
			value={{
				setCurrentMessage,
				currentMessage,
				setViewedMessages,
				viewedMessages,
				setMessages,
				messages,
				confirmPopup,
				setShow,
				show,
				hasFetched,
				fetchMessages,
				setReadOnly,
				readOnly,
				groupedMessages,
			}}
		>
			<></>
			{/* {currentMessage && (
				<PopupDialog
					expiraEm={currentMessage.criadoEm as string}
					urgencia={currentMessage.urgencia as number}
					onCommit={confirmPopup}
					onCancel={() => {
						if (!readOnly && currentMessage.confirmacao) return;
						if (currentMessage) {
							const hasViewed = viewedMessages?.find(
								(vm) =>
									vm.codigo_mensageria ===
									currentMessage.codigo_mensageria,
							);

							if (!hasViewed) {
								setViewedMessages((prev) => [
									...prev,
									currentMessage,
								]);
							}
						}
						setMessages((prev) => {
							const updatedMessages = prev.slice(1);
							setCurrentMessage(updatedMessages[0] || null);
							setShow(updatedMessages.length > 0);
							return updatedMessages;
						});
						setReadOnly(false);
					}}
					readOnly={readOnly}
					required={currentMessage.confirmacao}
					title={currentMessage.titulo as string}
					open={show}
					submitButtonLabel="Ok"
					closable={false}
				>
					<MessageBody>{currentMessage.descricao}</MessageBody>
				</PopupDialog>
			)} */}

			{children}
		</PopupContext.Provider>
	);
};

export const usePopup = () => {
	const context = useContext(PopupContext);

	if (!context) {
		throw new Error('usePopup deve ser usado dentro de um PopupProvider');
	}
	return context;
};
