import Breadcrumbs from '@/components/Breadcrumbs';
import { ReleaseModal } from '@/components/ReleaseModal';
import { Sidebar } from '@/components/Sidebar';
import UserDisplay from '@/components/UserDisplay';
import { useLock } from '@/context/lock.context';
import { useSidebar } from '@/context/sidebar.context';
import { useReleaseNotes } from '@/hooks/useReleaseNotes';
import LockScreen from '@/components/Lock';
import { useBreakpoint } from '@/utils/breakpoints';
import { SnackbarProvider } from 'notistack';
import React, { PropsWithChildren, useContext } from 'react';
import {
	Body,
	ContainerGrid,
	FooterLink,
	FooterLinks,
	FooterText,
	MainContentWrapper,
	StyledContentWrapper,
	StyledFooterWrapper,
	StyledHeaderWrapper,
	WrapperRow,
} from './styles';

type LayoutMeasuresContextValue = {
	headerHeight: number;
	setHeaderHeight(height: number): void;
};
const LayoutMeasuresContext = React.createContext<LayoutMeasuresContextValue>({
	headerHeight: 0,
	setHeaderHeight() {},
});

function LayoutWithLock({ children }: PropsWithChildren) {
	const { isLocked } = useLock();

	return (
		<>
			<div
				style={{
					filter: isLocked ? 'blur(6px)' : 'none',
					transition: 'filter 0.3s ease',
					pointerEvents: isLocked ? 'none' : 'auto',
				}}
			>
				{children}
			</div>

			{isLocked && <LockScreen />}
		</>
	);
}

function HeaderWrapper(
	props: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	>,
) {
	const { setHeaderHeight } = useContext(LayoutMeasuresContext);
	const ref = React.useRef<HTMLElement | null>(null);

	React.useEffect(() => {
		if (ref.current === null) return;
		const { height } = ref.current.getBoundingClientRect();
		setHeaderHeight(height);
	}, [setHeaderHeight]);

	return <StyledHeaderWrapper ref={ref} {...props} />;
}

function ContentWrapper(
	props: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	>,
) {
	const breakpoint = useBreakpoint();
	const mobile = breakpoint === 'sm' || breakpoint === 'md';
	const contentStyle = {
		padding: mobile ? '1rem 2rem' : '0rem 1.3rem 0 2.5rem',
	};

	return <StyledContentWrapper style={{ ...contentStyle }} {...props} />;
}

function FooterWrapper(
	props: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	>,
) {
	const breakpoint = useBreakpoint();
	const mobile = breakpoint === 'sm' || breakpoint === 'md';
	const contentStyle = {
		padding: mobile ? '0rem 1.3rem' : '0rem 1.3rem',
	};

	return (
		<StyledFooterWrapper
			style={{
				...contentStyle,
			}}
			{...props}
		/>
	);
}

export default function MainLayout({ children }: PropsWithChildren) {
	const [headerHeight, setHeaderHeight] = React.useState(0);
	const { sidebarExpanded } = useSidebar();
	const breakpoint = useBreakpoint();
	const mobile = breakpoint === 'sm' || breakpoint === 'md';
	const { open, release, close } = useReleaseNotes();

	return (
		<LayoutMeasuresContext.Provider
			value={{ headerHeight, setHeaderHeight }}
		>
			<ReleaseModal open={open} release={release} onClose={close} />
			<LayoutWithLock>
				<ContainerGrid mobile={mobile} opened={sidebarExpanded}>
					<Sidebar />

					<Body>
						<HeaderWrapper>
							<WrapperRow>
								<Breadcrumbs />
								<UserDisplay />
							</WrapperRow>
						</HeaderWrapper>

						<ContentWrapper>
							<MainContentWrapper>{children}</MainContentWrapper>
						</ContentWrapper>

						<FooterWrapper>
							<FooterText>
								© Sem Nome Ainda - {new Date().getFullYear()}
							</FooterText>

							<FooterLinks>
								<FooterLink href="#">Sobre</FooterLink>
								<FooterLink href="#">Suporte</FooterLink>
								<FooterLink href="#">Contate-nos</FooterLink>
							</FooterLinks>
						</FooterWrapper>
					</Body>
					<SnackbarProvider />
				</ContainerGrid>
			</LayoutWithLock>
		</LayoutMeasuresContext.Provider>
	);
}
