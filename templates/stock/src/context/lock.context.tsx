'use client';
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useGuard } from './guard.context';

type LockContextType = {
	isLocked: boolean;
	lock: () => void;
	unlock: () => void;
};

const LockContext = createContext<LockContextType | null>(null);

const INACTIVITY_TIME = 5 * 60 * 1000;
const STORAGE_KEY = 'app_locked';

export const LockProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useGuard();

	const [isLocked, setIsLocked] = useState(false);
	const timerRef = useRef<number | null>(null);

	const clearTimer = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	};

	const persistLock = () => {
		sessionStorage.setItem(STORAGE_KEY, 'true');
	};

	const removeLockPersist = () => {
		sessionStorage.removeItem(STORAGE_KEY);
	};

	const lock = () => {
		if (!user) return;
		setIsLocked(true);
		persistLock();
	};

	const unlock = () => {
		setIsLocked(false);
		removeLockPersist();
		resetTimer();
	};

	const resetTimer = () => {
		if (!user || isLocked) return;

		clearTimer();

		timerRef.current = window.setTimeout(() => {
			lock();
		}, INACTIVITY_TIME);
	};

	useEffect(() => {
		const stored = sessionStorage.getItem(STORAGE_KEY);
		if (stored && user) {
			setIsLocked(true);
		}
	}, [user]);

	useEffect(() => {
		if (!user) {
			clearTimer();
			setIsLocked(false);
			removeLockPersist();
			return;
		}

		const events = ['mousemove', 'keydown', 'click', 'scroll'];

		const handleActivity = () => {
			if (!isLocked) resetTimer();
		};

		events.forEach((event) =>
			window.addEventListener(event, handleActivity),
		);

		resetTimer();

		return () => {
			events.forEach((event) =>
				window.removeEventListener(event, handleActivity),
			);
			clearTimer();
		};
	}, [isLocked, user]);

	useEffect(() => {
		document.body.style.overflow = isLocked ? 'hidden' : 'auto';
	}, [isLocked]);

	useEffect(() => {
		if (!isLocked) return;

		window.history.pushState(null, '', window.location.href);
		const handler = () => window.history.go(1);

		window.addEventListener('popstate', handler);
		return () => window.removeEventListener('popstate', handler);
	}, [isLocked]);

	return (
		<LockContext.Provider value={{ isLocked, lock, unlock }}>
			{children}
		</LockContext.Provider>
	);
};

export const useLock = () => {
	const context = useContext(LockContext);
	if (!context) throw new Error('useLock must be used within LockProvider');
	return context;
};
