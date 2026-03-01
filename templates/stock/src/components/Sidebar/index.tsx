'use client';
import { useSidebar as useHookSidebar } from '@/context/sidebar.context';
import { useSidebar } from '@/stores/sidebar';
import { useBreakpoint } from '@/utils/breakpoints';
import { css } from '@emotion/css';
import { KeyboardDoubleArrowRightRounded } from '@mui/icons-material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftRounded from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, SvgIcon } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { MenuContainer, MenuEntry, MenuItem, MenuWrapper } from './styles';
import { SidebarSubmenuType, SidebarType } from './type.zod';

const icon = (name: string) => {
	switch (name) {
		case 'ManagementIcon':
			return ManageAccountsIcon;
		case 'notifications':
			return NotificationsIcon;
		case 'format_list_numbered':
			return FormatListNumberedIcon;
		case 'keyboard_double_arrow_left':
			return KeyboardDoubleArrowLeftRounded;
		default:
			return GridViewRoundedIcon;
	}
};

export function Menu({
	menu,
	sidebarOpen,
	setOpenMenuId,
	openMenuId,
	getMenu,
	getSubMenu,
}: {
	menu: SidebarType;
	sidebarOpen: boolean;
	openMenuId: number | null;
	setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
	getMenu: (isOpen: boolean, menu: SidebarType, pathname: string) => boolean;
	getSubMenu: (submenu: SidebarSubmenuType, menu: SidebarType) => boolean;
}) {
	const router = useRouter();
	const path = usePathname();

	const isOpen = openMenuId === menu.codigoMenu;
	const handleMenuClick = () => {
		setOpenMenuId(isOpen ? null : Number(menu.codigoMenu));
	};

	const breakpoint = useBreakpoint();
	const mobile = breakpoint === 'sm' || breakpoint === 'md';
	return (
		<div
			style={{
				background: isOpen
					? 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08))'
					: 'transparent',
				backdropFilter: isOpen ? 'blur(6px)' : undefined,
				border: isOpen
					? '1px solid rgba(99,102,241,0.25)'
					: '1px solid transparent',
				borderRadius: '8px',
				padding: '8px',
			}}
		>
			<MenuItem
				open={isOpen}
				isActive={getMenu(isOpen, menu, path)}
				onClick={() =>
					menu.submenus && menu.submenus.length > 0
						? sidebarOpen
							? handleMenuClick()
							: undefined
						: router.push(`${menu.pagina}`)
				}
			>
				<MenuEntry open={sidebarOpen} mobile={mobile}>
					<SvgIcon
						className="icon-side"
						inheritViewBox
						component={icon(menu.icone || '')}
					/>
					<span>{menu.linguagens?.at(0)?.descricao}</span>
					{menu.submenus ? (
						isOpen ? (
							<KeyboardArrowDown className="icon-arrow" />
						) : (
							<KeyboardArrowRight className="icon-arrow" />
						)
					) : null}
				</MenuEntry>
			</MenuItem>
			{isOpen && menu.submenus && (
				<>
					<div>
						{menu.submenus.map((submenu) => {
							return (
								<div
									key={submenu.codigoMenu}
									className={css`
										display: flex;
										flex-flow: column;
										padding-top: 8px;
										gap: 16px;
									`}
								>
									<MenuItem
										open={isOpen}
										isActive={getSubMenu(submenu, menu)}
										onClick={() => {
											if (
												submenu.pagina?.startsWith(
													'http',
												)
											) {
												return window.location.replace(
													submenu.pagina,
												);
											}
											return router.push(
												`${submenu.pagina}`,
											);
										}}
									>
										<MenuEntry
											open={sidebarOpen}
											mobile={mobile}
										>
											<span>
												{
													submenu.linguagens?.at(0)
														?.descricao
												}
											</span>
										</MenuEntry>
									</MenuItem>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export const Sidebar = () => {
	const [openMenuId, setOpenMenuId] = React.useState<number | null>(null);
	// const { sidebar } = useSidebar();
	const sidebar = useMemo(
		() => [
			{
				codigoMenu: 190,
				linguagens: [{ codigo: 'pt-BR', descricao: 'Home' }],
				sequencia: 1,
				icone: 'ManagementIcon',
				pagina: '/',
				// submenus: [
				// 	{
				// 		codigoMenu: 191,
				// 		linguagens: [
				// 			{
				// 				codigo: 'pt-BR',
				// 				descricao: 'Home',
				// 			},
				// 		],
				// 		pagina: '/adm/',
				// 		sequencia: 1,
				// 		editar: true,
				// 		exportar: true,
				// 		integrar: true,
				// 		criadoPor: 1,
				// 		criadoEm: '2024-10-28T11:36:40.757',
				// 	},
				// 	{
				// 		codigoMenu: 192,
				// 		linguagens: [
				// 			{
				// 				codigo: 'pt-BR',
				// 				descricao: 'Usuários',
				// 			},
				// 		],
				// 		pagina: '/adm/#',
				// 		sequencia: 2,
				// 		editar: true,
				// 		exportar: true,
				// 		integrar: true,
				// 		criadoPor: 1,
				// 		criadoEm: '2024-10-28T11:36:40.757',
				// 	},
				// ],
				criadoPor: 1,
				criadoEm: '2024-10-28T11:36:40.757',
			},
				{
						codigoMenu: 193,
						linguagens: [
							{
								codigo: 'pt-BR',
								descricao: 'Hello Word',
							},
						],
						pagina: '/hello/',
						sequencia: 3,
						editar: true,
						exportar: true,
						integrar: true,
						criadoPor: 1,
						criadoEm: '2024-10-28T11:36:40.757',
					},
		],
		[],
	);

	const { sidebarExpanded, toggleSidebarExpanded, setSidebarExpanded } =
		useHookSidebar();
	const breakpoint = useBreakpoint();
	const mobile = breakpoint === 'sm' || breakpoint === 'md';

	React.useEffect(() => {
		if (mobile && sidebarExpanded) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [mobile, sidebarExpanded]);

	const sidebarContent = React.useMemo(() => {
		if (!sidebar) return [];

		const sortBySequence = (items: SidebarType[]) =>
			items.sort((a, b) => (a.sequencia || 0) - (b.sequencia || 0));

		const sortedSidebar = sidebar.map((menu) => ({
			...menu,
			submenus: menu?.submenus ? sortBySequence(menu.submenus) : null,
		}));

		return sortBySequence(sortedSidebar as SidebarType[]);
	}, [sidebar]);

	React.useEffect(() => {
		if (!sidebarExpanded) setOpenMenuId(null);
	}, [sidebarExpanded]);

	const getMenu = (
		isOpen?: boolean,
		menu?: SidebarType,
		pathname?: string,
	): boolean => {
		return (
			isOpen ||
			((menu?.submenus &&
				menu?.submenus.some((submenu) => {
					return (
						pathname === submenu.pagina || getSubMenu(submenu, menu)
					);
				})) as boolean) ||
			pathname === menu?.pagina
		);
	};
	const path = usePathname();

	const getSubMenu = (submenu: SidebarSubmenuType, menu: SidebarType) => {
		const isExactMatch = path === submenu.pagina;
		const isSubmenu = menu.submenus?.find((sub) => sub.pagina === path);
		const splitCountPath =
			path.split('/').length === 2 ||
			path.split('/').length === 3 ||
			path.split('/').length === 4;
		const startsWith = path
			.replaceAll('s', '')
			.startsWith(submenu.pagina?.replaceAll('s', ''));

		const isInternalRoute =
			!isSubmenu &&
			!isExactMatch &&
			(path.startsWith(submenu.pagina) || startsWith) &&
			(submenu.pagina.split('/').length === 2 ||
				submenu.pagina.split('/').length === 3) &&
			splitCountPath;

		if (isExactMatch) {
			return true;
		}

		if (isInternalRoute) {
			return true;
		}

		return false;
	};

	React.useEffect(() => {
		const handleMouseEnter = () => setSidebarExpanded(true);
		const handleMouseLeave = () => setSidebarExpanded(false);
		if (typeof document !== 'undefined') {
			const sidebarElement = document.getElementById('sidebar');
			if (sidebarElement) {
				sidebarElement.addEventListener('mouseenter', handleMouseEnter);
				sidebarElement.addEventListener('mouseleave', handleMouseLeave);
			}

			return () => {
				if (sidebarElement) {
					sidebarElement.removeEventListener(
						'mouseenter',
						handleMouseEnter,
					);
					sidebarElement.removeEventListener(
						'mouseleave',
						handleMouseLeave,
					);
				}
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MenuContainer id="sidebar" open={sidebarExpanded} mobile={mobile}>
			<MenuWrapper open={sidebarExpanded}>
				{sidebarContent?.map((menu) => (
					<Menu
						key={menu.codigoMenu}
						menu={menu}
						sidebarOpen={sidebarExpanded}
						getMenu={getMenu}
						getSubMenu={getSubMenu}
						openMenuId={openMenuId}
						setOpenMenuId={setOpenMenuId}
					/>
				))}
			</MenuWrapper>

			<div
				className={css`
					display: flex;
					flex-direction: column;
					align-items: ${sidebarExpanded ? 'flex-start' : 'center'};
					gap: 16px;
					padding: 16px;
					width: 100%;
				`}
			>
				{sidebarExpanded && (
					<span
						className={css`
							font-size: 0.75rem;
							display: flex;
							align-items: center;
							justify-content: center;
							width: 90%;
							text-align: center;
							letter-spacing: 2px;
							font-weight: 600;
							color: rgba(255, 255, 255, 0.6);
						`}
					>
						SAAS.IO
					</span>
				)}

				{mobile && (
					<IconButton
						onClick={toggleSidebarExpanded}
						className={css`
							align-self: ${sidebarExpanded
								? 'flex-end'
								: 'center'};
						`}
					>
						{sidebarExpanded ? (
							<KeyboardDoubleArrowLeftRounded
								fontSize="medium"
								className={css`
									color: rgba(255, 255, 255, 0.9);
								`}
							/>
						) : (
							<KeyboardDoubleArrowRightRounded
								fontSize="medium"
								className={css`
									color: rgba(255, 255, 255, 0.9);
								`}
							/>
						)}
					</IconButton>
				)}
			</div>
		</MenuContainer>
	);
};
