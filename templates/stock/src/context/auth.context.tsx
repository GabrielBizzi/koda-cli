'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthSession, AuthProvider as Provider } from '@ti_torra/auth';
import { authManager } from '@/managers/auth.manager';
import { api } from '@/services/api';

type AuthContextType = {
	session: AuthSession | null;
};

const AuthContext = createContext<AuthContextType>({
	session: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<AuthSession | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		let mounted = true;

		async function bootstrap() {
			await authManager.init();

			const currentSession = authManager.getSession();

			if (mounted) {
				setSession(currentSession);
				setReady(true);
			}
		}

		bootstrap();

		return () => {
			mounted = false;
		};
	}, []);

	useEffect(() => {
		const unsubscribe = authManager.subscribe((newSession) => {
			setSession(newSession);

			if (newSession?.accessToken) {
				api.defaults.headers.common.Authorization = `Bearer ${newSession.accessToken}`;
			} else {
				delete api.defaults.headers.common.Authorization;
			}
		});

		return unsubscribe;
	}, []);

	if (!ready) {
		return (
			<div
				style={{
					height: '100vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: `
          radial-gradient(circle at center, rgba(99,102,241,0.12), transparent 65%),
          linear-gradient(135deg, #0f172a 0%, #1a1f3d 40%, #292D43 100%)
        `,
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '40px',
					}}
				>
					<div
						style={{
							fontSize: '28px',
							fontWeight: 600,
							letterSpacing: '4px',
							background:
								'linear-gradient(135deg,#6366f1,#8b5cf6)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							textShadow: '0 0 30px rgba(99,102,241,0.4)',
							animation: 'fadeIn 1.2s ease',
						}}
					>
						SAAS.IO
					</div>

					<div
						style={{
							width: 500,
							height: 8,
							borderRadius: 30,
							background: 'rgba(255,255,255,0.05)',
							overflow: 'hidden',
							position: 'relative',
						}}
					>
						<div
							style={{
								width: '35%',
								height: '100%',
								borderRadius: 30,
								background:
									'linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)',
								animation: 'shimmer 1.6s infinite',
							}}
						/>
					</div>
				</div>

				<style>
					{`
          @keyframes shimmer {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(280%); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
				</style>
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{ session }}>
			<Provider manager={authManager}>{children}</Provider>
		</AuthContext.Provider>
	);
}

export function useSession() {
	return useContext(AuthContext);
}
