import { Button, Typography } from '@mui/material';
import {
	FlexibleHeader,
	ErrorDialogActions,
	ErrorDialogCloseButton,
	ErrorDialogForm,
	StyledDialog,
	StyledDialogActions,
	StyledDialogContent,
	TitleContentHeader,
	TitleHeader,
	ToolContentHeader,
	BadgeCode,
	RoteDialog,
	RoteFlex,
} from './styles';
import { ErrorDialogProps } from './types.zod';
import JsonView from '@uiw/react-json-view';
import { customThemeJsonViewe } from '@/utils/jsonTheme';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { copy } from '@/utils/clipboard';

export function ErrorDialog({
	open,
	title,
	message,
	onClose,
	width,
	err,
}: ErrorDialogProps) {
	const { enqueueSnackbar } = useSnackbar();

	const handleCopy = useCallback(async () => {
		if (!err) return;

		const method = err?.config?.method?.toUpperCase();
		const status = err?.status;
		const url = err?.config?.url ?? '';
		const data = err?.config?.data;
		const responseBody = err?.response?.data;
		const baseURL = err?.config?.baseURL ?? '';
		const ambiente = baseURL.includes('hml') ? 'Homologação' : 'Produção';

		const formatted = `
[${method}] ${status} - ${err?.code}
Ambiente: ${ambiente}
URL: ${url}
Base URL: ${baseURL}

🔹 Request Data:
${data ? data : '[vazio]'}

🔹 Response Body:
${responseBody ? JSON.stringify(responseBody, null, 2) : '[vazio]'}

🔹 Mensagem:
${message ?? '[nenhuma mensagem]'}
		`.trim();

		await copy(formatted);
		enqueueSnackbar('Erro copiado com sucesso!', {
			variant: 'success',
		});
		onClose && onClose();
	}, [enqueueSnackbar, err, message, onClose]);

	if (!open) return null;

	return (
		<StyledDialog width={width} fullWidth open onClose={onClose}>
			<FlexibleHeader>
				<TitleContentHeader>
					<TitleHeader>{title}</TitleHeader>
				</TitleContentHeader>
				<ToolContentHeader>
					<ErrorDialogCloseButton onClose={onClose} />
				</ToolContentHeader>
			</FlexibleHeader>

			<StyledDialogContent width={width}>
				<div>
					{/* <Typography
						style={{
							margin: '20px 0px 0px 0px',
							fontSize: '14px',
							padding: '0',
							fontWeight: 'bold',
							color: 'var(--color-neutral-05)',
						}}
						variant="h2"
					>
						Mensagem
					</Typography> */}
					<ErrorDialogForm>{message}</ErrorDialogForm>
				</div>

				<hr
					style={{
						margin: '20px 0px',
					}}
				/>

				<Typography
					style={{
						margin: '20px 0px 10px 0px',
						fontSize: '14px',
						padding: '0',
						fontStyle: 'italic',
						color: 'var(--color-neutral-05)',
					}}
					variant="h2"
				>
					Detalhes
				</Typography>

				{err && (
					<>
						<BadgeCode>
							[{err?.config?.method?.toUpperCase()}] {err?.status}{' '}
							- {err?.code}
						</BadgeCode>
						<RoteFlex>
							<p
								style={{
									fontSize: '14px',
									margin: '0',
									padding: '0',
								}}
							>
								URL:
							</p>
							<RoteDialog>{err?.config?.url}</RoteDialog>
						</RoteFlex>
					</>
				)}

				{err?.config?.data && err.config?.data.includes('{') ? (
					<>
						<Typography
							style={{
								margin: '20px 0px 10px 0px',
								fontSize: '14px',
								padding: '0',
								color: 'var(--color-neutral-05)',
							}}
							variant="h2"
						>
							Request Data
						</Typography>
						<JsonView
							collapsed={0}
							style={{
								...customThemeJsonViewe,
								borderRadius: '5px',
								border: '1px solid var(--color-neutral-03)',
								padding: '16px',
							}}
							value={JSON.parse(err.config?.data)}
						/>
					</>
				) : (
					<p>{err?.config?.data}</p>
				)}
			</StyledDialogContent>

			<StyledDialogActions>
				<ErrorDialogActions>
					{onClose ? (
						<Button
							style={{
								color: 'var(--color-neutral-01) !important',
								fontWeight: '500',
								background: 'var(--color-primary-02)',
								fontSize: '13px',
								fontFamily: 'var(--font-montserrat)',
								borderRadius: '0',
							}}
							variant="contained"
							color="secondary"
							onClick={onClose}
						>
							Fechar
						</Button>
					) : null}
					<Button
						variant="contained"
						color="primary"
						style={{
							color: 'var(--color-neutral-01) !important',
							fontWeight: '500',
							background: 'var(--color-primary-01)',
							fontSize: '13px',
							fontFamily: 'var(--font-montserrat)',
							borderRadius: '0',
						}}
						onClick={handleCopy}
					>
						Copiar
					</Button>
				</ErrorDialogActions>
			</StyledDialogActions>
		</StyledDialog>
	);
}
