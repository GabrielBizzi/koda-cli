import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { isAxiosError } from 'axios';

interface ErrorResponse {
	message?: string;
	errors?: { mensagem: string }[];
	erros?: { mensagem: string }[];
}

export const useErrorHandler = () => {
	const { enqueueSnackbar } = useSnackbar();

	const handleError = useCallback(
		(err: unknown) => {
			if (isAxiosError(err)) {
				if (err.response) {
					const errorData = err.response.data as ErrorResponse;

					if (errorData?.erros?.length) {
						enqueueSnackbar(
							`Erro: ${errorData.erros[0].mensagem}`,
							{
								variant: 'error',
							},
						);
					} else if (errorData?.errors?.length) {
						enqueueSnackbar(
							`Erro: ${errorData.errors[0].mensagem}`,
							{
								variant: 'error',
							},
						);
					} else if (errorData?.message) {
						enqueueSnackbar(`Erro: ${errorData.message}`, {
							variant: 'error',
						});
					} else {
						enqueueSnackbar(
							`Erro desconhecido na resposta: ${JSON.stringify(errorData)}`,
							{
								variant: 'error',
							},
						);
					}
				} else {
					enqueueSnackbar(
						`Erro sem resposta do servidor: ${err.message}`,
						{
							variant: 'error',
						},
					);
				}
			} else {
				enqueueSnackbar(`Erro inesperado: ${String(err)}`, {
					variant: 'error',
				});
			}

			console.error(err);
		},
		[enqueueSnackbar],
	);

	return handleError;
};
