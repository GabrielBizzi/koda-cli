'use client';
import { TextField } from '@/components/Form/TextField';
import { Avatar } from '@mui/material';
import { useCallback, useState } from 'react';
import { useUnlockHook } from './_hooks/useHooks';
import { Container, Form, LoginButton, Main, UserArea } from './styles';
import { useGuard } from '@/context/guard.context';
import { useSnackbar } from 'notistack';

const LockScreen = () => {
	const { user } = useGuard();
	const { handleSubmit, setPassword, password } = useUnlockHook();
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const handleUnlock = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			try {
				setLoading(true);

				await handleSubmit();
			} catch {
				setPassword('');
				enqueueSnackbar('Senha incorreta', {
					variant: 'warning',
				});
			} finally {
				setLoading(false);
			}
		},
		[password, handleSubmit],
	);

	return (
		<Main>
			<Container>
				<UserArea>
					<Avatar
						sx={{
							width: 72,
							height: 72,
							margin: '0 auto',
							bgcolor: '#6366f1',
							fontSize: 28,
						}}
					>
						{user?.nome?.[0]}
					</Avatar>

					<h1>Sessão Bloqueada</h1>
					<p>Olá, {user?.nome}. Digite sua senha para continuar.</p>
				</UserArea>

				<Form onSubmit={handleUnlock}>
					<TextField
						type="password"
						name="password"
						placeholder="Digite sua senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<LoginButton type="submit">
						{loading ? 'Validando...' : 'Desbloquear'}
					</LoginButton>
				</Form>
			</Container>
		</Main>
	);
};

export default LockScreen;
