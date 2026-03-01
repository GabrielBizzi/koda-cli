import { useGuard } from '@/context/guard.context';
import { useLock } from '@/context/lock.context';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useAuth } from '@ti_torra/auth';
import { useCallback, useState } from 'react';

export const useUnlockHook = () => {
	const { unlock } = useLock();
	const [password, setPassword] = useState('');
	const { unlock: unlockGuard } = useGuard();
	const [loading, setLoading] = useState(false);
	const handleError = useErrorHandler();
	const { session } = useAuth();

	const handleSubmit = useCallback(async () => {
		if (!session?.user?.login) return;

		try {
			setLoading(true);

			await unlockGuard({
				login: session.user.login,
				password,
			});

			unlock();
		} catch (err) {
			handleError(err);
			setPassword('');
		} finally {
			setLoading(false);
		}
	}, [password, session, unlockGuard, unlock, handleError]);

	return { handleSubmit, loading, password, setPassword };
};
