'use client';

import { useEffect, useState } from 'react';
import { APP_VERSION } from '@/config/appVersion';
import { releases } from '@/release/release';

const STORAGE_KEY = 'saas_release_seen_version';

export function useReleaseNotes() {
	const [open, setOpen] = useState(false);

	const currentRelease = releases.find((r) => r.version === APP_VERSION);

	useEffect(() => {
		if (!currentRelease) return;

		const lastSeen = localStorage.getItem(STORAGE_KEY);

		if (lastSeen !== APP_VERSION) {
			setOpen(true);
		}
	}, [currentRelease]);

	const markAsSeen = () => {
		localStorage.setItem(STORAGE_KEY, APP_VERSION);
		setOpen(false);
	};

	return {
		open,
		release: currentRelease,
		close: markAsSeen,
	};
}
