'use client';
import { Initializer } from '@/components/Initializer';
// import Auth from '@/components/Auth/IsAuth';
import { AuthProvider } from '@/context/auth.context';
import { ExportProvider } from '@/context/excel.context';
import { LockProvider } from '@/context/lock.context';
import { MountProvider } from '@/context/overlay.context';
import { PaginationProvider } from '@/context/pagination.context';
import { PermissionProvider } from '@/context/permission.context';
import { PopupProvider } from '@/context/PopupProvider';
import { ReauthProvider } from '@/context/reauth.context';
import { SidebarProvider } from '@/context/sidebar.context';
import MainLayout from '@/layout';
import { Providers } from '@/providers/_index';
import { ReactNode } from 'react';

export default function MainAdmLayout({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<Initializer />

			<Providers
				providers={[
					MountProvider,
					ReauthProvider,
					LockProvider,
					PopupProvider,
					PaginationProvider,
					SidebarProvider,
					PermissionProvider,
					ExportProvider,
				]}
			>
				{/* <Auth> */}
				<MainLayout>{children}</MainLayout>
				{/* </Auth> */}
			</Providers>
		</AuthProvider>
	);
}
