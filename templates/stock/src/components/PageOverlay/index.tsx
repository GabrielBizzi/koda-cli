'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Backdrop, Panel } from './styles';
import { OverlayContext } from './context';

interface PageOverlayProps {
	children: ReactNode;
	width?: number;
}

export default function PageOverlay({
	children,
	width = 768,
}: PageOverlayProps) {
	const router = useRouter();
	const panelRef = useRef<HTMLDivElement>(null);
	const [onSuccess, setOnSuccess] = useState<(() => void) | null>(null);
	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [containerWidth, setContainerWidth] = useState(width);

	useEffect(() => {
		requestAnimationFrame(() => setIsMounted(true));
	}, []);

	useEffect(() => {
		if (!panelRef.current) return;

		const observer = new ResizeObserver(([entry]) => {
			setContainerWidth(entry.contentRect.width);
		});

		observer.observe(panelRef.current);

		return () => observer.disconnect();
	}, []);

	const handleClose = () => {
		setIsClosing(true);
		setIsMounted(false);
	};

	return (
		<OverlayContext.Provider
			value={{
				isOverlay: true,
				width: containerWidth,
				closeOverlay: handleClose,
				onSuccess,
				setOnSuccess,
			}}
		>
			<Backdrop
				onClick={handleClose}
				closing={isClosing}
				mounted={isMounted}
			>
				<Panel
					ref={panelRef}
					width={width}
					closing={isClosing}
					mounted={isMounted}
					onClick={(e) => e.stopPropagation()}
					onTransitionEnd={() => {
						if (!isClosing) return;

						const shouldRefresh =
							sessionStorage.getItem('overlay-refresh');
						const origin = sessionStorage.getItem('overlay-origin');

						sessionStorage.removeItem('overlay-refresh');
						sessionStorage.removeItem('overlay-origin');

						if (origin) {
							router.push(origin);

							if (shouldRefresh) {
								setTimeout(() => router.refresh(), 50);
							}

							return;
						}

						router.back();

						if (shouldRefresh) {
							setTimeout(() => router.refresh(), 50);
						}
					}}
				>
					{children}
				</Panel>
			</Backdrop>
		</OverlayContext.Provider>
	);
}
