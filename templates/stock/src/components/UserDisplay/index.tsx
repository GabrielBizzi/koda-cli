'use client';
import { DefaultRoutes } from '@/common/DefaultRoutes';
import { useSession } from '@/context/auth.context';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Menu, MenuItem } from '@mui/material';
import { useAuth } from '@ti_torra/auth';
import { destroyCookie } from 'nookies';
import { useState } from 'react';
import { version } from '../../../package.json';
import {
	AvatarCircle,
	LogoutText,
	UserActions,
	UserInfo,
	UserName,
	Version,
	VerticalLine,
	Wrapper,
} from './styles';

export default function UserDisplay() {
	const { manager } = useAuth();
	const { session } = useSession();
	// const { sidebarExpanded, toggleSidebarExpanded } = useSidebar();
	// const breakpoint = useBreakpoint();

	if (!session?.user) return null;

	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

	const openMenu = Boolean(menuAnchor);

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setMenuAnchor(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setMenuAnchor(null);
	};
	return (
		<Wrapper>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '16px',
				}}
			>
				<UserInfo>
					<UserName>{session.user.nome}</UserName>
					<Version>v{version}</Version>
				</UserInfo>

				<AvatarCircle>
					{session.user.nome?.[0]?.toUpperCase()}
				</AvatarCircle>
			</div>
			<VerticalLine />
			<div>
				<UserActions onClick={handleOpenMenu}>
					<LogoutText>Sair</LogoutText>
					<KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
				</UserActions>

				<Menu
					anchorEl={menuAnchor}
					open={openMenu}
					onClose={handleCloseMenu}
					PaperProps={{
						sx: {
							mt: 1,
							boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
						},
					}}
				>
					<MenuItem
						onClick={() => {
							manager.logout();
							destroyCookie(null, 'Auth.Token', {
								path: '/',
							});
							window.location.href = `${process.env.NEXT_PUBLIC_LOCAL_URL + DefaultRoutes.logout}`;
						}}
					>
						Sair
					</MenuItem>
				</Menu>
			</div>
		</Wrapper>
	);
}
