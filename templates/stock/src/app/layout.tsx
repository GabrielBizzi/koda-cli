import Theme from '@/layout/theme';
import { GlobalStyles } from '@/styles/global';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ReactNode } from 'react';

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
});

export const metadata: Metadata = {
	title: {
		default: 'Stock - ERSTECH',
		template: '%s | Stock - ERSTECH',
	},
	description:
		'Saas.IO é a plataforma inteligente da ERSTECH para gestão, administração e controle operacional com alta performance e segurança.',

	applicationName: 'Stock - ERSTECH',

	authors: [
		{
			name: 'ERSTECH',
		},
	],

	creator: 'ERSTECH',
	publisher: 'ERSTECH',

	metadataBase: new URL('https://portal.kodana.com.br'),

	robots: {
		index: false,
		follow: false,
	},

	openGraph: {
		title: 'Stock - ERSTECH',
		description:
			'Plataforma SaaS da ERSTECH para gestão inteligente, segura e escalável.',
		type: 'website',
	},

	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="pt-BR"
			className={montserrat.className}
			data-layout="horizontal"
			data-layout-width="horizontal"
		>
			<body>
				<AppRouterCacheProvider>
					<Theme>
						<GlobalStyles />
						{children}
					</Theme>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
